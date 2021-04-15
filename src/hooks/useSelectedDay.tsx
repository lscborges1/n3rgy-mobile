/* eslint-disable no-await-in-loop */
import {
  addDays,
  isToday,
  subDays,
  subWeeks,
  addWeeks,
  startOfWeek,
  isThisMonth,
  startOfMonth,
  subMonths,
  isAfter,
  addMonths,
  isThisWeek,
} from 'date-fns';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface SelectedDayProviderProps {
  children: ReactNode;
}
interface SelectedDayContextData {
  selectedDay: Date;
  handleNextDay: () => void;
  handleLastDay: (cacheStart: Date) => void;
  handleNextWeek: () => void;
  handleLastWeek: (cacheStart: Date) => void;
  handleNextMonth: () => void;
  handleLastMonth: (cacheStart: Date) => void;

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

  function handleLastDay(cacheStart: Date) {
    const yesterday = subDays(selectedDay, 1);

    if (isAfter(cacheStart, yesterday)) {
      return;
    }

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

  function handleLastWeek(cacheStart: Date) {
    const lastWeek = subWeeks(startOfWeek(selectedDay, { weekStartsOn: 1 }), 1);

    if (isAfter(cacheStart, lastWeek)) {
      return;
    }

    setSelectedDay(currentDay => {
      const startOfCurrentWeek = startOfWeek(currentDay, { weekStartsOn: 1 });
      const newSelectedDay = subWeeks(startOfCurrentWeek, 1);

      return newSelectedDay;
    });
  }

  function handleNextMonth() {
    if (isThisMonth(selectedDay)) {
      return;
    }
    setSelectedDay(currentDay => {
      const startOfCurrentMonth = startOfMonth(currentDay);
      const newSelectedDay = addMonths(startOfCurrentMonth, 1);

      return newSelectedDay;
    });
  }

  function handleLastMonth(cacheStart: Date) {
    const lastMonth = subMonths(startOfMonth(selectedDay), 1);

    if (isAfter(cacheStart, lastMonth)) {
      return;
    }

    setSelectedDay(currentDay => {
      const startOfCurrentMonth = startOfMonth(currentDay);
      const newSelectedDay = subMonths(startOfCurrentMonth, 1);

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
        handleNextMonth,
        handleLastMonth,
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
