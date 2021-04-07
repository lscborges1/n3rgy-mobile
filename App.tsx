import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppStack } from './src/routes/AppStack.routes';
import { ElectricityProvider } from './src/hooks/useConsumption';

export default function App(): JSX.Element {
  return (
    <ElectricityProvider>
      <StatusBar translucent backgroundColor="transparent" />
      <AppStack />
    </ElectricityProvider>
  );
}
