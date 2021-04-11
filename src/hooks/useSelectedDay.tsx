/* eslint-disable no-await-in-loop */
import { addDays, isToday, subDays } from 'date-fns';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface SelectedDayProviderProps {
  children: ReactNode;
}
interface SelectedDayContextData {
  selectedDay: Date;
  handleNextDay: () => void;
  handleLastDay: () => void;
}

const SelectedDayContext = createContext({} as SelectedDayContextData);

export function SelectedDayProvider({
  children,
}: SelectedDayProviderProps): JSX.Element {
  const [selectedDay, setSelectedDay] = useState(new Date());

  function handleNextDay() {
    if (isToday(selectedDay)) {
      return;
    }
    setSelectedDay(currentDay => addDays(currentDay, 1));
  }

  function handleLastDay() {
    setSelectedDay(currentDay => subDays(currentDay, 1));
  }

  return (
    <SelectedDayContext.Provider
      value={{
        selectedDay,
        handleNextDay,
        handleLastDay,
      }}
    >
      {children}
    </SelectedDayContext.Provider>
  );
}

export function useSelectedDay(): SelectedDayContextData {
  const context = useContext(SelectedDayContext);
  return context;
}
