import React from 'react';
import { SlideAreaChart } from '@connectedcars/react-native-slide-charts';
import { Container } from './styles';

interface DayGraphProps {
  typeOfConsumption: 'electricity' | 'gas';
}

export function DayGraph({ typeOfConsumption }: DayGraphProps): JSX.Element {
  const data = [
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
    { x: 5, y: 5 },
    { x: 6, y: 6 },
    { x: 7, y: 7 },
    { x: 8, y: 8 },
    { x: 9, y: 9 },
    { x: 10, y: 10 },
    { x: 11, y: 11 },
    { x: 12, y: 12 },
    { x: 13, y: 13 },
    { x: 14, y: 14 },
    { x: 15, y: 15 },
    { x: 16, y: 14 },
    { x: 17, y: 13 },
    { x: 18, y: 12 },
    { x: 19, y: 11 },
    { x: 20, y: 10 },
    { x: 21, y: 9 },
    { x: 22, y: 8 },
    { x: 23, y: 7 },
    { x: 24, y: 6 },
    { x: 25, y: 5 },
    { x: 26, y: 4 },
    { x: 27, y: 3 },
    { x: 28, y: 2 },
    { x: 29, y: 1 },
  ];

  return (
    <Container>
      <SlideAreaChart data={data} />
    </Container>
  );
}
