import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppStack } from './src/routes/AppStack.routes';
import { AuthProvider } from './src/hooks/useAuth';

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <StatusBar translucent backgroundColor="transparent" />
      <AppStack />
    </AuthProvider>
  );
}
