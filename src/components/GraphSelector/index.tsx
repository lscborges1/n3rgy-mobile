import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, ButtonContainer, GraphSelectorText } from './styles';

interface GraphSelectorProps {
  selectedGraph: string;
  graphSelection(graph: string): void;
}

export function GraphSelector({
  graphSelection,
  selectedGraph,
}: GraphSelectorProps): JSX.Element {
  return (
    <Container>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          graphSelection('Day');
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
          graphSelection('Week');
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
          graphSelection('Month');
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
