import React from 'react';
import { Image, KeyboardAvoidingView, Platform } from 'react-native';
import { LandingBackground, ImageContainer } from './styles';
import logoImg from '../../assets/logo/Logo.png';
import landingBackground from '../../assets/landingBackGround/landingBackground.png';

export function Landing(): JSX.Element {
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <LandingBackground style={{ height: 100 }} source={landingBackground}>
          <ImageContainer>
            <Image source={logoImg} />
          </ImageContainer>

          {/* <Input
            value={IHDMACInput}
            onChangeText={text => setIHDMACInput(text)}
            placeholder="IHDMAC"
            secureTextEntry
          />

          <Button
            buttonIcon="log-in-outline"
            onPress={() => {
              handleNavigateToDashboard(IHDMACInput);
            }}
          >
            SIGN IN
          </Button>
          <Button buttonIcon="globe-outline" onPress={handleLinkToSignUp}>
            SIGN UP
          </Button> */}
        </LandingBackground>
      </KeyboardAvoidingView>
    </>
  );
}
