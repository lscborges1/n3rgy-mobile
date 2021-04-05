import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { GraphSelector } from '../../components/GraphSelector';
import { DayGraph } from '../../components/Graphs/DayGraph';
// import { WeekGraph } from '../../components/Graphs/WeekGraph';
// import { MonthGraph } from '../../components/Graphs/MonthGraph';
import { Container, Loading } from './styles';
import { ConsumptionCards } from '../../components/ConsumptionCards';
import { WeekGraph } from '../../components/Graphs/WeekGraph';
import { MonthGraph } from '../../components/Graphs/MonthGraph';
import { DaySelector } from '../../components/DaySelector';

export function Electricity(): JSX.Element {
  const [isCacheLoading, setIsCacheLoading] = useState(false);
  const [selectedGraph, setSelectedGraph] = useState('Day');

  function handleGraphSelection(graph: string) {
    setSelectedGraph(graph);
  }

  return (
    <>
      <Header />
      <Container>
        <GraphSelector
          handleGraphSelection={handleGraphSelection}
          selectedGraph={selectedGraph}
        />
        <DaySelector />

        <Loading size="large" color="#ebab21" animating={isCacheLoading} />

        {selectedGraph === 'Day' && !isCacheLoading && (
          <DayGraph typeOfConsumption="electricity" />
        )}

        {selectedGraph === 'Week' && !isCacheLoading && (
          <WeekGraph typeOfConsumption="electricity" />
        )}

        {selectedGraph === 'Month' && !isCacheLoading && (
          <MonthGraph typeOfConsumption="electricity" />
        )}
        {!isCacheLoading && (
          <ConsumptionCards
            typeOfConsumption="electricity"
            consumptionUnit="kWh"
            selectedGraph="Day"
            totalConsumption="150"
            percentConsumption="20%"
          />
        )}
      </Container>
    </>
  );
}
