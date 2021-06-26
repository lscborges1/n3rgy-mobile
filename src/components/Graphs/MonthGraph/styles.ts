import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const GraphContainer = styled.View`
  flex: 1;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const HeatMapContainer = styled.View`
  flex-direction: row;
  padding-left: 20px;
  width: 100%;
  margin-bottom: 10px;
`;

export const DatesContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  margin-right: 5px;
  padding-top: 8.5px;
  padding-bottom: 8.5px;
`;

export const DatesText = styled.Text`
  margin: 0;
  /* font-family: 'Lato-Bold'; */
  font-size: 14px;
  color: #8d8d8f;
`;

export const SubtitleContainer = styled.View`
  margin-top: 5px;
  margin-bottom: 25px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SubtitleText = styled.Text`
  /* font-family: 'Lato-Bold'; */
  font-size: 18px;
  color: #8d8d8f;
  margin-left: 10px;
  margin-right: 10px;
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
  margin-left: 3.5px;
  margin-right: 3.5px;
  width: 15px;
  height: 15px;
  background-color: ${props => props.color};
`;
