import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { useConsumption } from '../../hooks/useConsumption';
import { Container, DateText } from './styles';

export function DaySelector(): JSX.Element {
  const { selectedDay, handleLastDay, handleNextDay } = useConsumption();

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
