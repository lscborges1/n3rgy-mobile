import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  LandingBackground,
  ImageContainer,
  TextInputContainer,
  TextInput,
  LandingButton,
  ButtonText,
} from './styles';
import logoImg from '../../assets/logo/Logo.png';
import landingBackground from '../../assets/landingBackGround/landingBackground.png';

export function Landing(): JSX.Element {
  const { navigate } = useNavigation();

  const [IHDMACInput, setIHDMACInput] = useState('');

  function handleSignInButton() {
    // navigate('ConsumptionTabs');
  }

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <LandingBackground style={{ height: 100 }} source={landingBackground}>
          <ImageContainer>
            <Image source={logoImg} />
          </ImageContainer>

          <TextInputContainer>
            <TextInput
              value={IHDMACInput}
              onChangeText={text => setIHDMACInput(text)}
              placeholder="IHDMAC"
              secureTextEntry
            />
          </TextInputContainer>

          <LandingButton>
            <ButtonText>SIGN IN</ButtonText>
            <Ionicons name="log-in-outline" size={25} />
          </LandingButton>

          <LandingButton>
            <ButtonText>SIGN UP</ButtonText>
            <Ionicons name="globe-outline" size={25} />
          </LandingButton>
        </LandingBackground>
      </KeyboardAvoidingView>
    </Container>
  );
}
