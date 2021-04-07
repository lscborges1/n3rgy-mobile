import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
  View,
} from 'react-native';
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
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

export function Landing(): JSX.Element {
  const { navigate } = useNavigation();
  const { login } = useAuth();

  const [loginLoading, setLoginLoading] = useState(false);
  const [IHDMACInput, setIHDMACInput] = useState('0CA2F4000025F4D4');

  async function handleSignInButton() {
    try {
      setLoginLoading(true);
      await api.get('', {
        headers: {
          Authorization: IHDMACInput,
        },
      });
    } catch {
      setLoginLoading(false);

      Alert.alert(
        'Sign in Error',
        'An error occured while signing in, check your credentials.',
      );
      return;
    }
    setLoginLoading(false);
    login(IHDMACInput);
    navigate('ConsumptionTabs');
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

          <Modal transparent visible={loginLoading}>
            <LandingBackground
              style={{ flex: 1 }}
              source={landingBackground}
              blurRadius={5}
            >
              <ActivityIndicator
                size="large"
                color="#ebab21"
                animating={loginLoading}
                style={{ flex: 1 }}
              />
            </LandingBackground>
          </Modal>

          <TextInputContainer>
            <TextInput
              value={IHDMACInput}
              onChangeText={text => setIHDMACInput(text)}
              placeholder="IHDMAC"
              secureTextEntry
            />
          </TextInputContainer>

          <LandingButton onPress={handleSignInButton}>
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
