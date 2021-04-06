import React from 'react';
import {
  SlideBarChart,
  GradientProps,
} from '@connectedcars/react-native-slide-charts';
import { LinearGradient, Stop } from 'react-native-svg';
import { Container } from './styles';

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
}

export function WeekGraph({ typeOfConsumption }: WeekGraphProps): JSX.Element {
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

  const data = [
    { x: 1, y: 5 },
    { x: 2, y: 6 },
    { x: 3, y: 11 },
    { x: 4, y: 50 },
    { x: 5, y: 3 },
    { x: 6, y: 34 },
    { x: 7, y: 20 },
  ];

  return (
    <Container>
      <SlideBarChart
        data={data}
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
              text: data[selectedBarNumber].y.toString(),
            }),
          ],
        }}
      />
    </Container>
  );
}
