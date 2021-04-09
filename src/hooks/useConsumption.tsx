/* eslint-disable no-await-in-loop */
import { addDays, subDays } from 'date-fns';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '../services/api';
import groupBy from '../utils/groupBy';

interface ConsumptionProviderProps {
  children: ReactNode;
}
interface ConsumptionContextData {
  selectedDay: Date;
  handleNextDay: () => void;
  handleLastDay: () => void;
  cacheLoading: boolean;
  getConsumptionData: () => void;
  gasConsumption: Map<K, V>;
  electricityConsumption: Map<K, V>;
}

const ConsumptionContext = createContext({} as ConsumptionContextData);

export function ConsumptionProvider({
  children,
}: ConsumptionProviderProps): JSX.Element {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [cacheLoading, setCacheLoading] = useState(false);
  const [gasConsumption, setGasConsumption] = useState(new Map());
  const [electricityConsumption, setElectricityConsumption] = useState(
    new Map(),
  );

  function handleNextDay() {
    if (selectedDay === new Date()) {
      return;
    }
    setSelectedDay(currentDay => addDays(currentDay, 1));
  }

  function handleLastDay() {
    setSelectedDay(currentDay => subDays(currentDay, 1));
  }

  function getConsumptionData() {
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

      setElectricityConsumption(groupedConsumption);
    }
    async function getGasConsumption() {
      const { data: ElectricityConsumption } = await api.get(
        'gas/consumption/1',
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
      setGasConsumption(groupedConsumption);
    }
    setCacheLoading(true);
    getGasConsumption();
    getElectricityConsumption();
    setCacheLoading(false);
  }

  return (
    <ConsumptionContext.Provider
      value={{
        selectedDay,
        handleNextDay,
        handleLastDay,
        cacheLoading,
        getConsumptionData,
        gasConsumption,
        electricityConsumption,
      }}
    >
      {children}
    </ConsumptionContext.Provider>
  );
}

export function useConsumption(): ConsumptionContextData {
  const context = useContext(ConsumptionContext);
  return context;
}
