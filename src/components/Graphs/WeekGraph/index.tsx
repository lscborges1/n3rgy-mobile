import React, { useCallback, useEffect, useState } from 'react';
import { SlideBarChart } from '@connectedcars/react-native-slide-charts';
import { format, startOfWeek, addDays, isThisWeek } from 'date-fns';
import { subWeeks } from 'date-fns/esm';
import { Container, GraphContainer } from './styles';
import { ConsumptionCards } from '../../ConsumptionCards';
import { useSelectedDay } from '../../../hooks/useSelectedDay';
import { BarChartFillGradient } from '../../../assets/GraphsGradients/FillGradients';

interface WeekGraphProps {
  typeOfConsumption: 'electricity' | 'gas';
  loading: boolean;
  data: Map<string, [{ timestamp: string; value: number }]>;
}

interface BarChartData {
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
  const [totalWeekConsumption, setTotalWeekConsumption] = useState(0);
  const [percentConsumption, setPercentConsumption] = useState('');
  const { selectedDay } = useSelectedDay();

  function getWeekStart(day: Date) {
    return startOfWeek(day, { weekStartsOn: 1 });
  }

  const filterWeekGraphData = useCallback(
    (day: Date) => {
      const newConsumptionData = [] as BarChartData[];
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
        } else {
          newConsumptionData.push({ x: i, y: 0 });
          dayHolder = addDays(dayHolder, 1);
        }
      }

      const newTotalWeekConsumption = newConsumptionData.reduce(
        (acc, consumption) => {
          return acc + consumption.y;
        },
        0,
      );
      return {
        totalConsumption: newTotalWeekConsumption,
        consumptionData: newConsumptionData,
      };
    },
    [data],
  );

  useEffect(() => {
    if (!loading) {
      const {
        consumptionData: currentWeekData,
        totalConsumption: currentWeekTotalConsumption,
      } = filterWeekGraphData(getWeekStart(selectedDay));
      setWeekConsumption(currentWeekData);
      setTotalWeekConsumption(currentWeekTotalConsumption);

      if (isThisWeek(selectedDay)) {
        setPercentConsumption('N/A');
        return;
      }

      const {
        totalConsumption: lastWeekTotalConsumption,
      } = filterWeekGraphData(getWeekStart(subWeeks(selectedDay, 1)));

      const percentageChangeOnconsuption =
        (currentWeekTotalConsumption / lastWeekTotalConsumption - 1) * 100;
      setPercentConsumption(`${percentageChangeOnconsuption.toFixed(2)}%`);
    }
  }, [selectedDay, loading, filterWeekGraphData]);

  return (
    <Container>
      <GraphContainer>
        <SlideBarChart
          data={weekConsumption}
          axisHeight={16}
          barSelectedColor="#212b36"
          renderFillGradient={BarChartFillGradient}
          barWidth={40}
          xAxisProps={{
            axisMarkerLabels: [
              `${format(getWeekStart(selectedDay), 'dd/MM')}`,
              'Tue',
              'Wed',
              'Thur',
              'Fri',
              'Sat',
              'Sun',
            ],
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
      </GraphContainer>

      <ConsumptionCards
        typeOfConsumption={typeOfConsumption}
        consumptionUnit={consumptionUnit}
        selectedGraph="Week"
        totalConsumption={totalWeekConsumption.toFixed(2)}
        percentConsumption={percentConsumption}
      />
    </Container>
  );
}
