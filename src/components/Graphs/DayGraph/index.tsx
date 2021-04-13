import React, { useCallback, useEffect, useState } from 'react';
import {
  SlideAreaChart,
  GradientProps,
} from '@connectedcars/react-native-slide-charts';
import { LinearGradient, Stop } from 'react-native-svg';
import { format, isToday, subDays } from 'date-fns';
import { Container } from './styles';
import { useSelectedDay } from '../../../hooks/useSelectedDay';
import { ConsumptionCards } from '../../ConsumptionCards';

const AreaChartFillGradient = (props: GradientProps) => {
  return (
    <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" {...props}>
      <Stop stopColor="#212b36" offset="0%" stopOpacity="0.2" />
      <Stop stopColor="#FFFFFF" offset="100%" stopOpacity="0.2" />
    </LinearGradient>
  );
};

interface DayGraphProps {
  typeOfConsumption: 'electricity' | 'gas';
  loading: boolean;
  data: Map<string, [{ timestamp: string; value: number }]>;
}
interface consuptionData {
  timestamp: string;
  value: number;
}

export function DayGraph({
  typeOfConsumption,
  loading,
  data,
}: DayGraphProps): JSX.Element {
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
  const [dayConsumption, setDayConsumption] = useState([
    { y: 0, x: new Date() },
  ]);
  const [totalDayConsumption, setTotalDayConsumption] = useState(0);
  const [percentConsumption, setPercentConsumption] = useState('');

  const { selectedDay } = useSelectedDay();

  const filterDayGraphData = useCallback(
    (day: Date) => {
      const todayConsumption = data.get(format(day, 'yyyy-MM-dd'));

      if (todayConsumption) {
        const formatedDayConsumption = todayConsumption.map(
          (consumption: consuptionData) => {
            return {
              y: consumption.value,
              x: new Date(consumption.timestamp.replace(/-/g, '/')),
            };
          },
        );

        const newTotalDayConsumption: number = todayConsumption.reduce(
          (acumulator, consumption: consuptionData) => {
            return acumulator + consumption.value;
          },
          0,
        );

        setTotalDayConsumption(newTotalDayConsumption);
        setDayConsumption(formatedDayConsumption);

        if (isToday(selectedDay)) {
          setPercentConsumption('N/A');
          return;
        }

        const yesterdayConsumption = data.get(
          format(subDays(selectedDay, 1), 'yyyy-MM-dd'),
        );
        if (yesterdayConsumption) {
          const newTotalYesterdayConsumption: number = yesterdayConsumption.reduce(
            (acumulator, consumption: consuptionData) => {
              return acumulator + consumption.value;
            },
            0,
          );

          const percentageChangeOnconsuption =
            (newTotalDayConsumption / newTotalYesterdayConsumption - 1) * 100;
          setPercentConsumption(`${percentageChangeOnconsuption.toFixed(2)} %`);
        }
      }
    },
    [data, selectedDay],
  );

  useEffect(() => {
    if (!loading) {
      filterDayGraphData(selectedDay);
    }
  }, [selectedDay, filterDayGraphData, loading]);

  return (
    <Container>
      <SlideAreaChart
        data={dayConsumption}
        animated={false}
        axisWidth={20}
        axisHeight={20}
        chartLineColor="#212b36"
        renderFillGradient={AreaChartFillGradient}
        yAxisProps={{
          horizontalLineColor: '#C9CACA',
          numberOfTicks: 20,
          interval: 0.5,
          markFirstLine: false,
        }}
        xAxisProps={{
          axisMarkerLabels: ['0', '6', '12', '18', '24'],
        }}
        toolTipProps={{
          toolTipTextRenderers: [
            ({ scaleY, y }) => ({
              text: `${scaleY
                .invert(y)
                .toFixed(2)
                .toString()} ${consumptionUnit}`,
            }),
            ({ scaleX, x }) => ({
              text: new Date(scaleX.invert(x))
                .toTimeString()
                .toString()
                .substr(0, 5),
            }),
          ],
        }}
      />

      <ConsumptionCards
        typeOfConsumption={typeOfConsumption}
        consumptionUnit={consumptionUnit}
        selectedGraph="Day"
        totalConsumption={totalDayConsumption.toFixed(2)}
        percentConsumption={percentConsumption}
      />
    </Container>
  );
}
