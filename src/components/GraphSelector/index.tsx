import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
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
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          handleGraphSelection('Day');
        }}
      >
        <ButtonContainer>
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
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          handleGraphSelection('Week');
        }}
      >
        <ButtonContainer>
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
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          handleGraphSelection('Month');
        }}
      >
        <ButtonContainer>
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
      </TouchableOpacity>
    </Container>
  );
}
