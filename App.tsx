import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

import { AppStack } from './src/routes/AppStack.routes';

export default function App(): JSX.Element {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <AppStack />
    </>
  );
}
