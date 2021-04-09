import React from 'react';
import {
  SlideAreaChart,
  GradientProps,
} from '@connectedcars/react-native-slide-charts';
import { LinearGradient, Stop } from 'react-native-svg';
import { Container } from './styles';
import { useConsumption } from '../../../hooks/useConsumption';

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
}
interface consuptionData {
  timestamp: string;
  value: number;
}

export function DayGraph({ typeOfConsumption }: DayGraphProps): JSX.Element {
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

  const { electricityConsumption } = useConsumption();
  console.log(electricityConsumption.get('2020-04-11'));

  // const [graphData, setGraphData] = useState([]);

  // const filterDayGraphData = useCallback(
  //   (day: Date) => {
  //     const newConsumptionData = data.get(format(day, 'yyyy-MM-dd'));
  //     const formatedDataNewData = newConsumptionData.map(() => {
  //       return {
  //         y: data.value,
  //         x: new Date(data.timestamp.replace(/-/g, '/')),
  //       };
  //     });

  //     return formatedDataNewData;
  //   },
  //   [data],
  // );

  // useEffect(() => {
  //   const consumptionData = filterDayGraphData(selectedDay);
  //   setGraphData(consumptionData);
  // }, [selectedDay, filterDayGraphData]);

  const data = [
    {
      value: 0.095,
      timestamp: '2021-04-04 00:30',
    },
    {
      value: 0.107,
      timestamp: '2021-04-04 01:00',
    },
    {
      value: 0.115,
      timestamp: '2021-04-04 01:30',
    },
    {
      value: 0.083,
      timestamp: '2021-04-04 02:00',
    },
    {
      value: 0.106,
      timestamp: '2021-04-04 02:30',
    },
    {
      value: 0.101,
      timestamp: '2021-04-04 03:00',
    },
    {
      value: 0.068,
      timestamp: '2021-04-04 03:30',
    },
    {
      value: 0.096,
      timestamp: '2021-04-04 04:00',
    },
    {
      value: 0.084,
      timestamp: '2021-04-04 04:30',
    },
    {
      value: 0.052,
      timestamp: '2021-04-04 05:00',
    },
    {
      value: 0.072,
      timestamp: '2021-04-04 05:30',
    },
    {
      value: 0.074,
      timestamp: '2021-04-04 06:00',
    },
    {
      value: 0.084,
      timestamp: '2021-04-04 06:30',
    },
    {
      value: 0.118,
      timestamp: '2021-04-04 07:00',
    },
    {
      value: 0.104,
      timestamp: '2021-04-04 07:30',
    },
    {
      value: 0.072,
      timestamp: '2021-04-04 08:00',
    },
    {
      value: 0.086,
      timestamp: '2021-04-04 08:30',
    },
    {
      value: 0.082,
      timestamp: '2021-04-04 09:00',
    },
    {
      value: 0.105,
      timestamp: '2021-04-04 09:30',
    },
    {
      value: 0.22,
      timestamp: '2021-04-04 10:00',
    },
    {
      value: 0.177,
      timestamp: '2021-04-04 10:30',
    },
    {
      value: 0.166,
      timestamp: '2021-04-04 11:00',
    },
    {
      value: 0.758,
      timestamp: '2021-04-04 11:30',
    },
    {
      value: 0.65,
      timestamp: '2021-04-04 12:00',
    },
    {
      value: 0.437,
      timestamp: '2021-04-04 12:30',
    },
    {
      value: 0.164,
      timestamp: '2021-04-04 13:00',
    },
    {
      value: 0.322,
      timestamp: '2021-04-04 13:30',
    },
    {
      value: 0.664,
      timestamp: '2021-04-04 14:00',
    },
    {
      value: 0.664,
      timestamp: '2021-04-04 14:30',
    },
    {
      value: 0.084,
      timestamp: '2021-04-04 15:00',
    },
    {
      value: 0.57,
      timestamp: '2021-04-04 15:30',
    },
    {
      value: 0.393,
      timestamp: '2021-04-04 16:00',
    },
    {
      value: 0.309,
      timestamp: '2021-04-04 16:30',
    },
    {
      value: 0.169,
      timestamp: '2021-04-04 17:00',
    },
    {
      value: 0.172,
      timestamp: '2021-04-04 17:30',
    },
    {
      value: 0.32,
      timestamp: '2021-04-04 18:00',
    },
    {
      value: 0.211,
      timestamp: '2021-04-04 18:30',
    },
    {
      value: 0.215,
      timestamp: '2021-04-04 19:00',
    },
    {
      value: 0.187,
      timestamp: '2021-04-04 19:30',
    },
    {
      value: 0.291,
      timestamp: '2021-04-04 20:00',
    },
    {
      value: 0.204,
      timestamp: '2021-04-04 20:30',
    },
    {
      value: 0.24,
      timestamp: '2021-04-04 21:00',
    },
    {
      value: 0.227,
      timestamp: '2021-04-04 21:30',
    },
    {
      value: 0.287,
      timestamp: '2021-04-04 22:00',
    },
    {
      value: 0.122,
      timestamp: '2021-04-04 22:30',
    },
    {
      value: 0.111,
      timestamp: '2021-04-04 23:00',
    },
    {
      value: 0.202,
      timestamp: '2021-04-04 23:30',
    },
    {
      value: 0.109,
      timestamp: '2021-04-05 00:00',
    },
  ];
  const graphData = data.map((consumption: consuptionData) => {
    return {
      y: consumption.value,
      x: new Date(consumption.timestamp.replace(/-/g, '/')),
    };
  });

  return (
    <Container>
      <SlideAreaChart
        data={graphData}
        axisWidth={20}
        axisHeight={20}
        chartLineColor="#212b36"
        renderFillGradient={AreaChartFillGradient}
        yAxisProps={{
          horizontalLineColor: '#C9CACA',
          numberOfTicks: 15,
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
    </Container>
  );
}
