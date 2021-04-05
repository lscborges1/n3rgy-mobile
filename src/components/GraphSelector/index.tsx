import React, { useState } from 'react';
import { Container, ButtonContainer, GraphSelectorText } from './styles';

interface GraphSelectorProps {
  selectedGraph: string;
  handleGraphSelection(graph: string): void;
}

export function GraphSelector({
  handleGraphSelection,
  selectedGraph,
}: GraphSelectorProps): JSX.Element {
  return (
    <Container>
      <ButtonContainer onPress={() => handleGraphSelection('Day')}>
        <GraphSelectorText
          style={
            selectedGraph === 'Day'
              ? { color: '#ebab21' }
              : { color: '#757575' }
          }
        >
          Day
        </GraphSelectorText>
      </ButtonContainer>

      <ButtonContainer onPress={() => handleGraphSelection('Week')}>
        <GraphSelectorText
          style={
            selectedGraph === 'Week'
              ? { color: '#ebab21' }
              : { color: '#757575' }
          }
        >
          Week
        </GraphSelectorText>
      </ButtonContainer>

      <ButtonContainer onPress={() => handleGraphSelection('Month')}>
        <GraphSelectorText
          style={
            selectedGraph === 'Month'
              ? { color: '#ebab21' }
              : { color: '#757575' }
          }
        >
          Month
        </GraphSelectorText>
      </ButtonContainer>
    </Container>
  );
}
