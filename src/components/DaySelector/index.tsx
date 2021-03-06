import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { Container, DateText } from './styles';
import { useSelectedDay } from '../../hooks/useSelectedDay';

interface DaySelectorProps {
  selectedGraph: string;
  cacheStart: Date;
  showDatePicker: () => void;
}

export function DaySelector({
  selectedGraph,
  cacheStart,
  showDatePicker,
}: DaySelectorProps): JSX.Element {
  const {
    selectedDay,
    handleLastDay,
    handleNextDay,
    handleNextWeek,
    handleLastWeek,
    handleNextMonth,
    handleLastMonth,
  } = useSelectedDay();

  let handleFowardDateNavigation;
  let handleBackDateNavigation;

  switch (selectedGraph) {
    case 'Day':
      handleFowardDateNavigation = handleNextDay;
      handleBackDateNavigation = handleLastDay;
      break;
    case 'Week':
      handleFowardDateNavigation = handleNextWeek;
      handleBackDateNavigation = handleLastWeek;
      break;
    case 'Month':
      handleFowardDateNavigation = handleNextMonth;
      handleBackDateNavigation = handleLastMonth;
      break;

    default:
      break;
  }

  return (
    <Container>
      <TouchableOpacity>
        <Ionicons
          name="chevron-back-outline"
          size={50}
          color="#ebab21"
          onPress={() => {
            handleBackDateNavigation(cacheStart);
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={showDatePicker}>
        <DateText> {format(selectedDay, 'dd/MM/yyyy')} </DateText>
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons
          name="chevron-forward-outline"
          size={50}
          color="#ebab21"
          onPress={handleFowardDateNavigation}
        />
      </TouchableOpacity>
    </Container>
  );
}
