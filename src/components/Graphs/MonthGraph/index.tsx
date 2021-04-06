import React from 'react';
import HeatMap from '../../HeatMap/index.js';
import {
  Container,
  HeatMapContainer,
  ColorBlock,
  ColorsContainer,
  SubtitleContainer,
  SubtitleText,
} from './styles';

interface MonthGraphProps {
  typeOfConsumption: 'electricity' | 'gas';
}

export function MonthGraph({
  typeOfConsumption,
}: MonthGraphProps): JSX.Element {
  return (
    <Container>
      <HeatMapContainer>
        <HeatMap
          colors={['#dfe5ec', '#90a5bb', '#617e9e', '#3a4c5f', '#212b36']}
          numberOfLines={7}
          maximumValue="10"
          blocksSize={35}
          colorsPercentage={[0, 0.000001, 41, 60, 80]}
          values={[
            1,
            2,
            4,
            5,
            6,
            7,
            8,
            8,
            4,
            9,
            8,
            7,
            1,
            2,
            4,
            5,
            6,
            7,
            8,
            8,
            4,
            9,
            8,
            7,
            4,
            9,
            8,
            7,
            0,
            0,
            0,
          ]}
          onBlockPress={({ index, value }) => console.log(index)}
        />
      </HeatMapContainer>

      <SubtitleContainer>
        <SubtitleText>Less</SubtitleText>
        <ColorsContainer>
          <ColorBlock color="#dfe5ec" />
          <ColorBlock color="#90a5bb" />
          <ColorBlock color="#617e9e" />
          <ColorBlock color="#3a4c5f" />
          <ColorBlock color="#212b36" />
        </ColorsContainer>
        <SubtitleText>More</SubtitleText>
      </SubtitleContainer>
    </Container>
  );
}
