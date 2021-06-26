import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px ${Platform.OS === 'android' ? 60 : 40}px;
  flex-direction: column;
`;

export const ImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TextContainer = styled.View`
  display: flex;
  width: 100%;
  height: 150px;
  padding: 10px;
  border-radius: 25px;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #fff;
  display: flex;
  font-size: 32px;
  align-items: center;
`;

export const Description = styled.Text`
  margin-top: 24px;
  color: #fff;
  display: flex;
  font-size: 20px;
  line-height: 26px;
  align-items: center;
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
  color: #232129;
  font-size: 14px;
`;
