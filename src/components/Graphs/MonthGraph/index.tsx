import React, { useCallback, useEffect, useState } from 'react';
import {
  getDaysInMonth,
  format,
  addDays,
  startOfMonth,
  isThisMonth,
  isAfter,
  getMonth,
} from 'date-fns';
import { subMonths } from 'date-fns/esm';
import { useSelectedDay } from '../../../hooks/useSelectedDay';
import { ConsumptionCards } from '../../ConsumptionCards';
import { HeatMap } from '../../HeatMap';

import {
  Container,
  HeatMapContainer,
  ColorBlock,
  ColorsContainer,
  SubtitleContainer,
  SubtitleText,
  DatesContainer,
  DatesText,
  GraphContainer,
} from './styles';

interface MonthGraphProps {
  typeOfConsumption: 'electricity' | 'gas';
  loading: boolean;
  data: Map<string, [{ timestamp: string; value: number }]>;
  cacheStart: Date;
  selectGraph: (graph: string) => void;
}

interface BlockProps {
  index: number;
  value: number;
}

export function MonthGraph({
  typeOfConsumption,
  loading,
  data,
  cacheStart,
  selectGraph,
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
  const { selectedDay, setDay } = useSelectedDay();

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

  const handleOnBlockPress = useCallback(
    (block: BlockProps) => {
      if (block.value === 0) {
        return;
      }
      setDay(addDays(startOfMonth(selectedDay), block.index));
      selectGraph('Day');
    },
    [selectGraph, setDay, selectedDay],
  );

  function getSelectedMonth(day: Date) {
    const month = getMonth(day) + 1;
    if (month < 10) {
      return `0${month}`;
    }
    return month;
  }

  useEffect(() => {
    if (!loading) {
      const {
        consumptionData: currentMonthData,
        totalConsumption: currentMonthTotalConsumption,
      } = filterMonthGraphData(startOfMonth(selectedDay));
      setMonthConsumption(currentMonthData);
      setTotalMonthConsumption(currentMonthTotalConsumption.toFixed(2));

      const startOfLastMonth = startOfMonth(subMonths(selectedDay, 1));

      const {
        totalConsumption: lastMonthTotalConsumption,
      } = filterMonthGraphData(startOfMonth(subMonths(selectedDay, 1)));

      if (
        isThisMonth(selectedDay) ||
        isAfter(cacheStart, startOfLastMonth) ||
        !lastMonthTotalConsumption
      ) {
        setPercentConsumption('N/A');
        return;
      }

      const percentageChangeOnconsuption =
        (currentMonthTotalConsumption / lastMonthTotalConsumption - 1) * 100;
      setPercentConsumption(`${percentageChangeOnconsuption.toFixed(2)}%`);
    }
  }, [selectedDay, filterMonthGraphData, loading, cacheStart]);

  return (
    <Container>
      <GraphContainer>
        <HeatMapContainer>
          <DatesContainer>
            <DatesText>{`01/${getSelectedMonth(selectedDay)}`}</DatesText>
            <DatesText>{`08/${getSelectedMonth(selectedDay)}`}</DatesText>
            <DatesText>{`15/${getSelectedMonth(selectedDay)}`}</DatesText>
            <DatesText>{`22/${getSelectedMonth(selectedDay)}`}</DatesText>
            {getDaysInMonth(selectedDay) > 28 && (
              <DatesText>{`29/${getSelectedMonth(selectedDay)}`}</DatesText>
            )}
          </DatesContainer>
          <HeatMap
            indexStart={0}
            colors={['#dfe5ec', '#90a5bb', '#617e9e', '#3a4c5f', '#212b36']}
            numberOfLines={7}
            maximumValue={Math.max(...monthConsumption)}
            blocksSize={34}
            colorsPercentage={[0, 0.000001, 41, 60, 80]}
            values={monthConsumption}
            onBlockPress={handleOnBlockPress}
          />
        </HeatMapContainer>
      </GraphContainer>

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
        selectedGraph="Month"
        totalConsumption={totalMonthConsumption}
        percentConsumption={percentConsumption}
      />
    </Container>
  );
}
