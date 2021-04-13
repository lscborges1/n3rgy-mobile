/* eslint-disable no-await-in-loop */
import {
  addDays,
  isToday,
  subDays,
  subWeeks,
  addWeeks,
  startOfWeek,
} from 'date-fns';
import { isThisWeek } from 'date-fns/esm';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface SelectedDayProviderProps {
  children: ReactNode;
}
interface SelectedDayContextData {
  selectedDay: Date;
  handleNextDay: () => void;
  handleLastDay: () => void;
  handleNextWeek: () => void;
  handleLastWeek: () => void;

  setDay: (day: Date) => void;
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

  function handleNextWeek() {
    if (isThisWeek(selectedDay, { weekStartsOn: 1 })) {
      return;
    }

    setSelectedDay(currentDay => {
      const startOfCurrentWeek = startOfWeek(currentDay, { weekStartsOn: 1 });
      const newSelectedDay = addWeeks(startOfCurrentWeek, 1);

      return newSelectedDay;
    });
  }

  function handleLastWeek() {
    setSelectedDay(currentDay => {
      const startOfCurrentWeek = startOfWeek(currentDay, { weekStartsOn: 1 });
      const newSelectedDay = subWeeks(startOfCurrentWeek, 1);

      return newSelectedDay;
    });
  }

  function setDay(day: Date) {
    setSelectedDay(day);
  }

  return (
    <SelectedDayContext.Provider
      value={{
        selectedDay,
        handleNextDay,
        handleLastDay,
        handleNextWeek,
        handleLastWeek,
        setDay,
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
