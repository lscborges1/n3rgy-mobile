import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { GraphSelector } from '../../components/GraphSelector';
import { DayGraph } from '../../components/Graphs/DayGraph';
import { Container, Loading } from './styles';
import { ConsumptionCards } from '../../components/ConsumptionCards';
import { WeekGraph } from '../../components/Graphs/WeekGraph';
import { MonthGraph } from '../../components/Graphs/MonthGraph';
import { DaySelector } from '../../components/DaySelector';
import { SettingsModal } from '../../components/SettingsModal';
import { useConsumption } from '../../hooks/useConsumption';

export function Electricity(): JSX.Element {
  const { electricityConsumption, selectedDay } = useConsumption();
  const [isCacheLoading, setIsCacheLoading] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [selectedGraph, setSelectedGraph] = useState('Day');

  function handleGraphSelection(graph: string) {
    setSelectedGraph(graph);
  }

  function handleOpenSettings() {
    setSettingsModal(true);
  }

  function handleCloseSettings() {
    setSettingsModal(false);
  }

  return (
    <>
      <SettingsModal
        isVisible={settingsModal}
        closeSettings={handleCloseSettings}
      />
      <Header settingsButton={handleOpenSettings} />
      <Container>
        <GraphSelector
          graphSelection={handleGraphSelection}
          selectedGraph={selectedGraph}
        />
        <DaySelector />
        {isCacheLoading && (
          <Loading size="large" color="#ebab21" animating={isCacheLoading} />
        )}

        {selectedGraph === 'Day' && !isCacheLoading && (
          <DayGraph
            data={electricityConsumption}
            selectedDay={selectedDay}
            typeOfConsumption="electricity"
          />
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
            selectedGraph={selectedGraph}
            totalConsumption="150"
            percentConsumption="20%"
          />
        )}
      </Container>
    </>
  );
}
