import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  position: relative;
  flex: 1;
  background-color: #fff;
  margin-top: -15px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding-bottom: 15px;
`;

export const Loading = styled(ActivityIndicator)`
  flex: 1;
`;
