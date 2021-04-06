import React from 'react';
import { Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container, SettingButton } from './styles';
import logoImg from '../../assets/logo/Logo.png';

interface HeaderProps {
  handleMenuButton: () => void;
}

export function Header({ handleMenuButton }: HeaderProps): JSX.Element {
  return (
    <Container>
      <SettingButton
        onPress={() => {
          handleMenuButton();
        }}
      >
        <Ionicons name="options-outline" size={40} color="#ebab21" />
      </SettingButton>

      <Image source={logoImg} />

      <View />
    </Container>
  );
}
