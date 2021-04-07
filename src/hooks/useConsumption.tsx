import { addDays, subDays } from 'date-fns';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '../services/api';

interface ElectricityProviderProps {
  children: ReactNode;
}
interface ElectricityContextData {
  selectedDay: Date;
  handleNextDay: () => void;
  handleLastDay: () => void;
}

const ElectricityContext = createContext({} as ElectricityContextData);

export function ElectricityProvider({
  children,
}: ElectricityProviderProps): JSX.Element {
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

  return (
    <ElectricityContext.Provider
      value={{ selectedDay, handleNextDay, handleLastDay }}
    >
      {children}
    </ElectricityContext.Provider>
  );
}

export function useConsumption(): ElectricityContextData {
  const context = useContext(ElectricityContext);
  return context;
}
