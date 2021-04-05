import React from 'react';
import { Container } from './styles';

interface MonthGraphProps {
  typeOfConsumption: 'electricity' | 'gas';
}

export function MonthGraph({
  typeOfConsumption,
}: MonthGraphProps): JSX.Element {
  return <Container>{/* <SlideAreaChart data={data} /> */}</Container>;
}
