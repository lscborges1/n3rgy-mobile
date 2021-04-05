import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: -5px;
  height: 45px;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const ButtonContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const GraphSelectorText = styled.Text`
  font-size: 20px;
  font-family: 'Lato-Bold';
  color: #757575;
`;
