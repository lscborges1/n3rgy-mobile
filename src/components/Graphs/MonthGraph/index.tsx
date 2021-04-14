import React, { useCallback, useEffect, useState } from 'react';
import {
  getDaysInMonth,
  format,
  addDays,
  startOfMonth,
  isThisMonth,
} from 'date-fns';
import { subMonths } from 'date-fns/esm';
import { useSelectedDay } from '../../../hooks/useSelectedDay';
import { ConsumptionCards } from '../../ConsumptionCards';
import HeatMap from '../../HeatMap/index.js';

import {
  Container,
  HeatMapContainer,
  ColorBlock,
  ColorsContainer,
  SubtitleContainer,
  SubtitleText,
} from './styles';

interface MonthGraphProps {
  typeOfConsumption: 'electricity' | 'gas';
  loading: boolean;
  data: Map<string, [{ timestamp: string; value: number }]>;
}

export function MonthGraph({
  typeOfConsumption,
  loading,
  data,
}: MonthGraphProps): JSX.Element {
  let consumptionUnit = '';
  switch (typeOfConsumption) {
    case 'electricity':
      consumptionUnit = 'kWh';
      break;
    case 'gas':
      consumptionUnit = 'm³';
      break;
    default:
      consumptionUnit = 'help-circle-outline';
  }
  const [monthConsumption, setMonthConsumption] = useState<number[]>([]);
  const [totalMonthConsumption, setTotalMonthConsumption] = useState('');
  const [percentConsumption, setPercentConsumption] = useState('');
  const { selectedDay } = useSelectedDay();

  const filterMonthGraphData = useCallback(
    (day: Date) => {
      const newConsumptionData = [] as number[];
      let totalConsumption = 0;
      let dayHolder = day;
      let i;
      for (i = 0; i < getDaysInMonth(day); i += 1) {
        const dayData = data.get(format(dayHolder, 'yyyy-MM-dd'));
        if (dayData) {
          const totalDayConsumption = dayData.reduce(
            (acc, { value }) => acc + value,
            0,
          );
          dayHolder = addDays(dayHolder, 1);
          totalConsumption += totalDayConsumption;
          newConsumptionData.push(Number(totalDayConsumption.toFixed(0)));
        } else {
          newConsumptionData.push(0);
          dayHolder = addDays(dayHolder, 1);
        }
      }
      return {
        totalConsumption,
        consumptionData: newConsumptionData,
      };
    },
    [data],
  );

  useEffect(() => {
    if (!loading) {
      const {
        consumptionData: currentMonthData,
        totalConsumption: currentMonthTotalConsumption,
      } = filterMonthGraphData(startOfMonth(selectedDay));
      setMonthConsumption(currentMonthData);
      setTotalMonthConsumption(currentMonthTotalConsumption.toFixed(2));

      if (isThisMonth(selectedDay)) {
        setPercentConsumption('N/A');
        return;
      }

      const {
        totalConsumption: lastMonthTotalConsumption,
      } = filterMonthGraphData(startOfMonth(subMonths(selectedDay, 1)));

      const percentageChangeOnconsuption =
        (currentMonthTotalConsumption / lastMonthTotalConsumption - 1) * 100;
      setPercentConsumption(`${percentageChangeOnconsuption.toFixed(2)}%`);
    }
  }, [loading, filterMonthGraphData, selectedDay]);

  return (
    <Container>
      <HeatMapContainer>
        <HeatMap
          colors={['#dfe5ec', '#90a5bb', '#617e9e', '#3a4c5f', '#212b36']}
          numberOfLines={7}
          maximumValue={String(Math.max(...monthConsumption))}
          blocksSize={34}
          colorsPercentage={[0, 0.000001, 41, 60, 80]}
          values={monthConsumption}
          // onBlockPress={({ index, value }) => console.log(index)}
        />
      </HeatMapContainer>

      <SubtitleContainer>
        <SubtitleText>Less</SubtitleText>
        <ColorsContainer>
          <ColorBlock color="#dfe5ec" />
          <ColorBlock color="#90a5bb" />
          <ColorBlock color="#617e9e" />
          <ColorBlock color="#3a4c5f" />
          <ColorBlock color="#212b36" />
        </ColorsContainer>
        <SubtitleText>More</SubtitleText>
      </SubtitleContainer>

      <ConsumptionCards
        typeOfConsumption={typeOfConsumption}
        consumptionUnit={consumptionUnit}
        selectedGraph="Week"
        totalConsumption={totalMonthConsumption}
        percentConsumption={percentConsumption}
      />
    </Container>
  );
}
