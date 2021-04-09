import styled from 'styled-components/native';

export const CardContainer = styled.View`
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
  align-self: center;
  margin-bottom: 10px;
`;

export const Card = styled.View`
  width: 45%;
  height: 150px;
  border-width: 2px;
  border-color: #c9caca;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

export const CardText = styled.Text`
  font-family: 'Lato-Bold';
  font-size: 30px;
  margin-bottom: 5px;
`;

export const UnitText = styled.Text`
  font-family: 'Lato-Bold';
  font-size: 15px;
`;
