/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { GraphSelector } from '../../components/GraphSelector';
import { DayGraph } from '../../components/Graphs/DayGraph';
import { Container, Loading } from './styles';
import { ConsumptionCards } from '../../components/ConsumptionCards';
import { WeekGraph } from '../../components/Graphs/WeekGraph';
import { MonthGraph } from '../../components/Graphs/MonthGraph';
import { DaySelector } from '../../components/DaySelector';
import { SettingsModal } from '../../components/SettingsModal';
import { api } from '../../services/api';
import groupBy from '../../utils/groupBy';

export function Electricity(): JSX.Element {
  const [isCacheLoading, setIsCacheLoading] = useState(true);
  const [settingsModal, setSettingsModal] = useState(false);
  const [selectedGraph, setSelectedGraph] = useState('Day');
  const [consumptionData, setConsumptionData] = useState(new Map());

  useEffect(() => {
    async function getElectricityConsumption() {
      const { data: ElectricityConsumption } = await api.get(
        'electricity/consumption/1',
      );
      const {
        start: cacheStart,
        end: cacheEnd,
      } = ElectricityConsumption.availableCacheRange;

      let requestStartDate = cacheStart;

      let cacheData = [];

      while (requestStartDate !== cacheEnd) {
        const resp = await api.get('/electricity/consumption/1', {
          params: {
            start: requestStartDate,
            end: cacheEnd,
          },
        });

        cacheData = cacheData.concat(resp.data.values);
        requestStartDate = resp.data.end;
      }

      const groupedConsumption = groupBy(cacheData, data =>
        data.timestamp.slice(0, 10),
      );
      setConsumptionData(groupedConsumption);
      setIsCacheLoading(false);
    }
    getElectricityConsumption();
  }, []);

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
            loading={isCacheLoading}
            data={consumptionData}
            typeOfConsumption="electricity"
          />
        )}

        {selectedGraph === 'Week' && !isCacheLoading && (
          <WeekGraph typeOfConsumption="electricity" />
        )}

        {selectedGraph === 'Month' && !isCacheLoading && (
          <MonthGraph typeOfConsumption="electricity" />
        )}
      </Container>
    </>
  );
}
