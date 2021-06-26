import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  ImageContainer,
  LandingButton,
  ButtonText,
  TextContainer,
  Title,
  Description,
} from './styles';

export function SignUp(): JSX.Element {
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  return (
    <Container>
      <ImageContainer>
        <TextContainer>
          <Title>Want to Sign Up?</Title>
          <Description>
            Visit the n3rgy consumer webpage to sign up and start visualizing
            your consumption data.
          </Description>
        </TextContainer>
      </ImageContainer>

      <LandingButton onPress={handleGoBack}>
        <ButtonText>GO BACK</ButtonText>
        <Ionicons name="arrow-back-outline" size={25} />
      </LandingButton>
    </Container>
  );
}
