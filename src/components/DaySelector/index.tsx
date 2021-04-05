import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Container, DateText } from './styles';

export function DaySelector(): JSX.Element {
  return (
    <Container>
      <Ionicons name="chevron-back-outline" size={50} color="#ebab21" />
      <DateText> 05/04/2020 </DateText>
      <Ionicons name="chevron-forward-outline" size={50} color="#ebab21" />
    </Container>
  );
}
