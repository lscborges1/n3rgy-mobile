import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

import { Landing } from './src/pages/Landing';

export default function App(): JSX.Element {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <Landing />
    </>
  );
}
