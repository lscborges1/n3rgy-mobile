import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { Container, DateText } from './styles';
import { useSelectedDay } from '../../hooks/useSelectedDay';

export function DaySelector(): JSX.Element {
  const { selectedDay, handleLastDay, handleNextDay } = useSelectedDay();

  return (
    <Container>
      <TouchableOpacity>
        <Ionicons
          name="chevron-back-outline"
          size={50}
          color="#ebab21"
          onPress={handleLastDay}
        />
      </TouchableOpacity>
      <DateText> {format(selectedDay, 'dd/MM/yyyy')} </DateText>
      <TouchableOpacity>
        <Ionicons
          name="chevron-forward-outline"
          size={50}
          color="#ebab21"
          onPress={handleNextDay}
        />
      </TouchableOpacity>
    </Container>
  );
}
