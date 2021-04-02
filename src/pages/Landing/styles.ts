import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const LandingBackground = styled.ImageBackground`
  flex: 1;
  padding: 0 30px ${Platform.OS === 'android' ? 60 : 40}px;

  justify-content: center;
`;

export const ImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
