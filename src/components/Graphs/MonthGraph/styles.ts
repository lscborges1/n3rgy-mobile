import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
`;

export const GraphContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const HeatMapContainer = styled.View`
  width: 70%;
  /* transform: rotate(90deg) rotateY(180deg); */
`;

export const SubtitleContainer = styled.View`
  display: flex;
  margin-top: -70px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SubtitleText = styled.Text`
  font-family: 'Lato-Bold';
  font-size: 18px;
  color: #8d8d8f;
  margin-left: 5px;
  margin-right: 5px;
`;

export const ColorsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface ColorBlockProps {
  color: string;
}

export const ColorBlock = styled.View<ColorBlockProps>`
  border-width: 0.5px;
  margin-left: 3px;
  width: 15px;
  height: 15px;
  background-color: ${props => props.color};
`;
