import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Card, CardContainer, CardText, UnitText } from './styles';

interface ConsumptionCardsProps {
  typeOfConsumption: 'electricity' | 'gas';
  totalConsumption: string;
  consumptionUnit: string;
  percentConsumption: string;
  selectedGraph: string;
}

export function ConsumptionCards({
  consumptionUnit,
  percentConsumption,
  totalConsumption,
  typeOfConsumption,
  selectedGraph,
}: ConsumptionCardsProps): JSX.Element {
  let consumptionIcon = '';
  switch (typeOfConsumption) {
    case 'electricity':
      consumptionIcon = 'bulb-outline';
      break;
    case 'gas':
      consumptionIcon = 'flame-outline';
      break;
    default:
      consumptionIcon = 'help-circle-outline';
  }
  return (
    <CardContainer>
      <Card>
        <Ionicons
          name={consumptionIcon}
          size={35}
          style={{
            marginRight: 5,
            marginTop: 5,
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          color="#ebab21"
        />
        <CardText>{totalConsumption}</CardText>
        <UnitText>{consumptionUnit}</UnitText>
      </Card>
      <Card>
        {percentConsumption !== 'N/A' && (
          <Ionicons
            name={
              Number(percentConsumption.slice(0, -1)) > 0
                ? 'chevron-up-circle-outline'
                : 'chevron-down-circle-outline'
            }
            size={30}
            color={
              Number(percentConsumption.slice(0, -1)) > 0
                ? '#E6173E'
                : '#44a45c'
            }
            style={{
              marginRight: 5,
              marginTop: 5,
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          />
        )}
        <CardText>{percentConsumption}</CardText>
        <UnitText>{`Last ${selectedGraph}`}</UnitText>
      </Card>
    </CardContainer>
  );
}
