import React, { useCallback, useEffect, useState } from 'react';
import {
  SlideBarChart,
  GradientProps,
} from '@connectedcars/react-native-slide-charts';
import { LinearGradient, Stop } from 'react-native-svg';
import { format, startOfWeek, addDays } from 'date-fns';
import { Container } from './styles';
import { ConsumptionCards } from '../../ConsumptionCards';
import groupWeekData from '../../../utils/groupWeekData';
import { useSelectedDay } from '../../../hooks/useSelectedDay';

const BarChartFillGradient = (props: GradientProps) => {
  return (
    <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" {...props}>
      <Stop stopColor="#212b36" offset="0%" stopOpacity="0.4" />
      <Stop stopColor="#212b36" offset="100%" stopOpacity="0.4" />
    </LinearGradient>
  );
};

interface WeekGraphProps {
  typeOfConsumption: 'electricity' | 'gas';
  loading: boolean;
  data: Map<string, [{ timestamp: string; value: number }]>;
}

interface ConsumptionData {
  x: number;
  y: number;
}

export function WeekGraph({
  typeOfConsumption,
  loading,
  data,
}: WeekGraphProps): JSX.Element {
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
  const [weekConsumption, setWeekConsumption] = useState([{ x: 0, y: 0 }]);
  const [totalWeekConsumption, setTotalWeekConsumption] = useState('');
  const [percentConsumption, setPercentConsumption] = useState('');
  const { selectedDay } = useSelectedDay();

  const data2 = [
    { x: 1, y: 5 },
    { x: 2, y: 6 },
    { x: 3, y: 11 },
    { x: 4, y: 50 },
    { x: 5, y: 3 },
    { x: 6, y: 34 },
    { x: 7, y: 20 },
  ];

  const filterWeekGraphData = useCallback(
    (day: Date) => {
      const newConsumptionData = [] as ConsumptionData[];
      let dayHolder = day;
      let i;

      for (i = 0; i < 7; i += 1) {
        const dayData = data.get(format(dayHolder, 'yyyy-MM-dd'));
        if (dayData) {
          const totalDayConsumption = dayData.reduce(
            (acc, { value }) => acc + value,
            0,
          );
          dayHolder = addDays(dayHolder, 1);
          newConsumptionData.push({ x: i, y: totalDayConsumption });
        }
      }

      setWeekConsumption(newConsumptionData);
    },
    [data],
  );

  useEffect(() => {
    if (!loading) {
      filterWeekGraphData(
        startOfWeek(selectedDay, {
          weekStartsOn: 1,
        }),
      );
    }
  }, [selectedDay, loading, filterWeekGraphData]);

  return (
    <Container>
      <SlideBarChart
        data={weekConsumption}
        axisHeight={16}
        barSelectedColor="#212b36"
        renderFillGradient={BarChartFillGradient}
        barWidth={40}
        xAxisProps={{
          axisMarkerLabels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
        }}
        toolTipProps={{
          lockTriangleCenter: true,
          toolTipTextRenderers: [
            () => ({ text: consumptionUnit }),
            ({ selectedBarNumber }) => ({
              text: weekConsumption[selectedBarNumber].y.toFixed(2),
            }),
          ],
        }}
      />

      <ConsumptionCards
        typeOfConsumption={typeOfConsumption}
        consumptionUnit={consumptionUnit}
        selectedGraph="Week"
        totalConsumption={totalWeekConsumption}
        percentConsumption={percentConsumption}
      />
    </Container>
  );
}
