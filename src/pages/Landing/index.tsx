import React, { useEffect, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// import * as WebBrowser from 'expo-web-browser';
// import { Text } from 'react-native-svg';

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
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

export function Landing(): JSX.Element {
  const { navigate } = useNavigation();
  const { login, IHDMAC } = useAuth();

  const [IHDMACInput, setIHDMACInput] = useState('');
  // const [result, setResult] = useState<WebBrowser.WebBrowserResult>();

  async function handleSignInButton() {
    try {
      api.defaults.headers.common.Authorization = IHDMACInput.toUpperCase();
      await api.get('');
      const upperCasedInput = IHDMACInput.toUpperCase();
      await login(upperCasedInput);
      navigate('ConsumptionTabs');
      return;
    } catch (e) {
      Alert.alert(
        'Sign in Error',
        'An error occured while signing in, check your credentials.',
      );
    }
  }

  function handleSignUpButton() {
    // const signInResult = await WebBrowser.openBrowserAsync(
    //   'https://data.n3rgy.com/consumer/sign-up',
    // );
    // setResult(signInResult);
    navigate('SignUp');
  }

  useEffect(() => {
    if (IHDMAC) {
      navigate('ConsumptionTabs');
    }
  }, [navigate, IHDMAC]);

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

          <LandingButton onPress={() => handleSignInButton()}>
            <ButtonText>SIGN IN</ButtonText>
            <Ionicons name="log-in-outline" size={25} />
          </LandingButton>

          <LandingButton onPress={() => handleSignUpButton()}>
            <ButtonText>SIGN UP</ButtonText>
            <Ionicons name="globe-outline" size={25} />
          </LandingButton>
        </LandingBackground>
        {/* <Text>{result && JSON.stringify(result)}</Text> */}
      </KeyboardAvoidingView>
    </Container>
  );
}
