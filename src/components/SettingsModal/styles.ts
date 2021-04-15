import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';

export const ModalContainer = styled(BlurView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

export const ModalView = styled.View`
  flex: 1;
  flex-direction: column;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  height: 35%;
  width: 100%;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  padding: 0 30px ${Platform.OS === 'android' ? 60 : 40}px;
`;

export const SettingsModalButton = styled.TouchableOpacity`
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
  font-family: 'Lato-Medium';
  color: #232129;
  font-size: 15px;
`;
