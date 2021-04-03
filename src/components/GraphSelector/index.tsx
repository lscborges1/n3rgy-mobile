import React, { useState } from 'react';
import { Container, ButtonContainer, GraphSelectorText } from './styles';

export function GraphSelector(): JSX.Element {
  const [selectedGraph, setSelectedGraph] = useState('Day');

  function handleGraphSelection(graph: string) {
    setSelectedGraph(graph);
  }

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
