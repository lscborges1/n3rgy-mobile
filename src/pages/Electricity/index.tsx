/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';
import { parse } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '../../components/Header';
import { GraphSelector } from '../../components/GraphSelector';
import { DayGraph } from '../../components/Graphs/DayGraph';
import { Container, Loading } from './styles';
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
  const [comsumptionCacheStart, setConsumptionCacheStart] = useState(
    new Date(),
  );
  const [comsumptionCacheEnd, setConsumptionCacheEnd] = useState(new Date());

  useEffect(() => {
    async function getElectricityConsumption(): Promise<void> {
      const [
        cachedConsumption,
        storedCacheStart,
        storedCacheEnd,
      ] = await AsyncStorage.multiGet([
        '@n3rgyMobile:electricityConsumption',
        '@n3rgyMobile:cacheStart',
        '@n3rgyMobile:cacheEnd',
      ]);

      if (cachedConsumption[1] && storedCacheStart[1] && storedCacheEnd[1]) {
        const groupedConsumption = groupBy(
          JSON.parse(cachedConsumption[1]),
          data => data.timestamp.slice(0, 10),
        );
        setConsumptionCacheStart(new Date(JSON.parse(storedCacheStart[1])));
        setConsumptionCacheEnd(new Date(JSON.parse(storedCacheEnd[1])));
        setConsumptionData(groupedConsumption);
        setIsCacheLoading(false);
      } else {
        const { data: ElectricityConsumption } = await api.get(
          'electricity/consumption/1',
        );
        const {
          start: cacheStart,
          end: cacheEnd,
        } = ElectricityConsumption.availableCacheRange;

        const parsedCacheStart = parse(
          String(cacheStart).slice(0, 8),
          'yyyyMMdd',
          new Date(),
        );
        const parsedCacheEnd = parse(
          String(cacheEnd).slice(0, 8),
          'yyyyMMdd',
          new Date(),
        );

        setConsumptionCacheStart(parsedCacheStart);
        setConsumptionCacheEnd(parsedCacheEnd);

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

        await AsyncStorage.multiSet([
          ['@n3rgyMobile:cacheStart', JSON.stringify(parsedCacheStart)],
          ['@n3rgyMobile:cacheEnd', JSON.stringify(parsedCacheEnd)],
          ['@n3rgyMobile:electricityConsumption', JSON.stringify(cacheData)],
        ]);

        const groupedConsumption = groupBy(cacheData, data =>
          data.timestamp.slice(0, 10),
        );

        setConsumptionData(groupedConsumption);

        setIsCacheLoading(false);
      }
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
        <DaySelector
          selectedGraph={selectedGraph}
          cacheStart={comsumptionCacheStart}
        />
        {isCacheLoading && (
          <Loading size="large" color="#ebab21" animating={isCacheLoading} />
        )}

        {selectedGraph === 'Day' && !isCacheLoading && (
          <DayGraph
            cacheStart={comsumptionCacheStart}
            loading={isCacheLoading}
            data={consumptionData}
            typeOfConsumption="electricity"
          />
        )}

        {selectedGraph === 'Week' && !isCacheLoading && (
          <WeekGraph
            cacheStart={comsumptionCacheStart}
            loading={isCacheLoading}
            data={consumptionData}
            typeOfConsumption="electricity"
          />
        )}

        {selectedGraph === 'Month' && !isCacheLoading && (
          <MonthGraph
            cacheStart={comsumptionCacheStart}
            loading={isCacheLoading}
            data={consumptionData}
            typeOfConsumption="electricity"
            selectGraph={handleGraphSelection}
          />
        )}
      </Container>
    </>
  );
}
