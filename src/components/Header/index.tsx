import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container } from './styles';
import logoImg from '../../assets/logo/Logo.png';

export function Header(): JSX.Element {
  return (
    <Container>
      <TouchableOpacity style={{ position: 'absolute', top: 30, left: 10 }}>
        <Ionicons name="options-outline" size={40} color="#ebab21" />
      </TouchableOpacity>

      <Image style={{ top: 40 }} source={logoImg} />
    </Container>
  );
}
