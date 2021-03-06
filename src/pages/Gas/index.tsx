/* eslint-disable no-await-in-loop */
import React, { useEffect, useRef, useState } from 'react';
import { isSameHour, parse } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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
import { useSelectedDay } from '../../hooks/useSelectedDay';

export function Gas(): JSX.Element {
  const [isCacheLoading, setIsCacheLoading] = useState(true);
  const [refreshCache, setRefreshCache] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedGraph, setSelectedGraph] = useState('Day');
  const [consumptionData, setConsumptionData] = useState(new Map());
  const [comsumptionCacheStart, setConsumptionCacheStart] = useState(
    new Date(),
  );

  const { selectedDay, setDay } = useSelectedDay();

  const currentDay = useRef(selectedDay);

  async function getGasConsumption(): Promise<void> {
    const { data: checkUpdate } = await api.get('/gas/consumption/1');

    const { availableCacheRange } = checkUpdate;

    const currentCacheEnd = parse(
      String(availableCacheRange.end).slice(0, 8),
      'yyyyMMdd',
      new Date(),
    );

    const [
      cachedConsumption,
      storedCacheStart,
      storedCacheEnd,
    ] = await AsyncStorage.multiGet([
      '@n3rgyMobile:gasConsumption',
      '@n3rgyMobile:gasCacheStart',
      '@n3rgyMobile:gasCacheEnd',
    ]);

    if (
      cachedConsumption[1] &&
      storedCacheStart[1] &&
      storedCacheEnd[1] &&
      isSameHour(new Date(JSON.parse(storedCacheEnd[1])), currentCacheEnd)
    ) {
      const groupedConsumption = groupBy(
        JSON.parse(cachedConsumption[1]),
        data => data.timestamp.slice(0, 10),
      );
      setConsumptionCacheStart(new Date(JSON.parse(storedCacheStart[1])));
      setConsumptionData(groupedConsumption);
      setIsCacheLoading(false);
    } else {
      const { data: gasConsumption } = await api.get('gas/consumption/1');
      const {
        start: cacheStart,
        end: cacheEnd,
      } = gasConsumption.availableCacheRange;

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

      let requestStartDate = cacheStart;

      let cacheData = [];

      while (requestStartDate !== cacheEnd) {
        const resp = await api.get('/gas/consumption/1', {
          params: {
            start: requestStartDate,
            end: cacheEnd,
          },
        });

        cacheData = cacheData.concat(resp.data.values);
        requestStartDate = resp.data.end;
      }

      const filteredCacheData = cacheData.map(({ timestamp, value }) => {
        if (value > 10000) {
          return {
            timestamp,
            value: 0,
          };
        }
        return {
          timestamp,
          value,
        };
      });

      await AsyncStorage.multiSet([
        ['@n3rgyMobile:gasCacheStart', JSON.stringify(parsedCacheStart)],
        ['@n3rgyMobile:gasCacheEnd', JSON.stringify(parsedCacheEnd)],
        ['@n3rgyMobile:gasConsumption', JSON.stringify(filteredCacheData)],
      ]);

      const groupedConsumption = groupBy(filteredCacheData, data =>
        data.timestamp.slice(0, 10),
      );

      setConsumptionData(groupedConsumption);

      setIsCacheLoading(false);
    }
  }

  useEffect(() => {
    getGasConsumption();
  }, [refreshCache]);

  function handleRefreshCache() {
    setConsumptionData(new Map());
    AsyncStorage.multiRemove([
      '@n3rgyMobile:gasConsumption',
      '@n3rgyMobile:gasCacheStart',
      '@n3rgyMobile:gasCacheEnd',
    ]);
    setIsCacheLoading(true);
    setRefreshCache(current => !current);
  }

  function handleGraphSelection(graph: string) {
    setSelectedGraph(graph);
  }

  function handleOpenSettings() {
    setSettingsModal(true);
  }

  function handleCloseSettings() {
    setSettingsModal(false);
  }

  function handleOpenDatePicker() {
    setShowDatePicker(true);
  }

  function handleCloseDatePicker() {
    setShowDatePicker(false);
  }

  function handleDatePicker(selectedDate) {
    setDay(selectedDate);
    currentDay.current = selectedDate;
    handleCloseDatePicker();
  }

  return (
    <>
      <SettingsModal
        isVisible={settingsModal}
        closeSettings={handleCloseSettings}
        refreshCache={handleRefreshCache}
      />
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        display="spinner"
        date={currentDay.current}
        maximumDate={new Date()}
        minimumDate={comsumptionCacheStart}
        onConfirm={handleDatePicker}
        onCancel={handleCloseDatePicker}
      />

      <Header settingsButton={handleOpenSettings} />
      <Container>
        <GraphSelector
          graphSelection={handleGraphSelection}
          selectedGraph={selectedGraph}
        />
        <DaySelector
          showDatePicker={handleOpenDatePicker}
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
            typeOfConsumption="gas"
          />
        )}

        {selectedGraph === 'Week' && !isCacheLoading && (
          <WeekGraph
            cacheStart={comsumptionCacheStart}
            loading={isCacheLoading}
            data={consumptionData}
            typeOfConsumption="gas"
          />
        )}

        {selectedGraph === 'Month' && !isCacheLoading && (
          <MonthGraph
            cacheStart={comsumptionCacheStart}
            loading={isCacheLoading}
            data={consumptionData}
            typeOfConsumption="gas"
          />
        )}
      </Container>
    </>
  );
}
