import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppStack } from './src/routes/AppStack.routes';
import { AuthProvider } from './src/hooks/useAuth';
import { ConsumptionCards } from './src/components/ConsumptionCards';
import { ConsumptionProvider } from './src/hooks/useConsumption';

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
