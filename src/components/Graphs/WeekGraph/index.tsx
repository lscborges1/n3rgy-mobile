import React from 'react';
import { SlideBarChart } from '@connectedcars/react-native-slide-charts';
import { Container } from './styles';

interface WeekGraphProps {
  typeOfConsumption: 'electricity' | 'gas';
}

export function WeekGraph({ typeOfConsumption }: WeekGraphProps): JSX.Element {
  const data = [
    { x: 1, y: 5 },
    { x: 2, y: 6 },
    { x: 3, y: 11 },
    { x: 4, y: 50 },
    { x: 5, y: 3 },
    { x: 6, y: 34 },
  ];

  return (
    <Container>
      <SlideBarChart data={data} />
    </Container>
  );
}
