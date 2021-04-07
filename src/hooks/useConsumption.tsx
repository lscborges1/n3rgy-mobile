import { addDays, subDays } from 'date-fns';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '../services/api';

interface ConsumptionProviderProps {
  children: ReactNode;
}
interface ConsumptionContextData {
  selectedDay: Date;
  handleNextDay: () => void;
  handleLastDay: () => void;
}

const ConsumptionContext = createContext({} as ConsumptionContextData);

export function ConsumptionProvider({
  children,
}: ConsumptionProviderProps): JSX.Element {
  const [selectedDay, setSelectedDay] = useState(new Date());

  function handleNextDay() {
    if (selectedDay === new Date()) {
      return;
    }
    setSelectedDay(currentDay => addDays(currentDay, 1));
  }

  function handleLastDay() {
    setSelectedDay(currentDay => subDays(currentDay, 1));
  }

  useEffect(() => {
    async function getConsumption() {
      const { data: GasConsumption } = await api.get('gas/consumption/1');
      const { data: ElectricityConsumption } = await api.get(
        'electricity/consumption/1',
      );
    }
    getConsumption();
  }, []);

  return (
    <ConsumptionContext.Provider
      value={{ selectedDay, handleNextDay, handleLastDay }}
    >
      {children}
    </ConsumptionContext.Provider>
  );
}

export function useConsumption(): ConsumptionContextData {
  const context = useContext(ConsumptionContext);
  return context;
}
