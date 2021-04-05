import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  position: relative;
  flex: 1;
  margin-top: -20px;
  height: 100%;
  background-color: #fff;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

export const Loading = styled(ActivityIndicator)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
