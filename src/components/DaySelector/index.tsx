import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, DateText } from './styles';

export function DaySelector(): JSX.Element {
  return (
    <Container>
      <TouchableOpacity>
        <Ionicons name="chevron-back-outline" size={50} color="#ebab21" />
      </TouchableOpacity>
      <DateText> 05/04/2020 </DateText>
      <TouchableOpacity>
        <Ionicons name="chevron-forward-outline" size={50} color="#ebab21" />
      </TouchableOpacity>
    </Container>
  );
}
