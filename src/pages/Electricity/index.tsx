import React from 'react';
import { ConsumptionGraphs } from '../../components/ConsumptionGraphs';
import { Header } from '../../components/Header';
import { GraphSelector } from '../../components/GraphSelector';
import { Container } from './styles';

export function Electricity(): JSX.Element {
  return (
    <>
      <Header />
      <Container>
        <GraphSelector />
        <ConsumptionGraphs />
      </Container>
    </>
  );
}
