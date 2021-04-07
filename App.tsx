import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppStack } from './src/routes/AppStack.routes';
import { ConsumptionProvider } from './src/hooks/useConsumption';
import { AuthProvider } from './src/hooks/useAuth';

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <ConsumptionProvider>
        <StatusBar translucent backgroundColor="transparent" />
        <AppStack />
      </ConsumptionProvider>
    </AuthProvider>
  );
}
