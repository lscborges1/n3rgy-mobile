import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

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

export const TextInputContainer = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fff;
  margin-bottom: 10px;
  border-width: 0;
  border-radius: 15px;
  border-color: #232129;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #312e38;
  font-size: 16px;
`;

export const LandingButton = styled(RectButton)`
  flex-direction: row;
  width: 100%;
  height: 60px;
  background: #ebab21;
  border-radius: 15px;
  padding-left: 30px;
  padding-right: 20px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
  font-family: 'Lato-Regular';
  color: #232129;
  font-size: 14px;
`;
