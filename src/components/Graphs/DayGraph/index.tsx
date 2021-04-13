import React, { useCallback, useEffect, useState } from 'react';
import { SlideAreaChart } from '@connectedcars/react-native-slide-charts';
import { format, isToday, subDays } from 'date-fns';
import { Container, GraphContainer } from './styles';
import { useSelectedDay } from '../../../hooks/useSelectedDay';
import { ConsumptionCards } from '../../ConsumptionCards';
import { AreaChartFillGradient } from '../../../assets/GraphsGradients/FillGradients';

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
          (acc, consumption: consuptionData) => {
            return acc + consumption.value;
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
            (acc, consumption: consuptionData) => {
              return acc + consumption.value;
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
      <GraphContainer>
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
      </GraphContainer>

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
