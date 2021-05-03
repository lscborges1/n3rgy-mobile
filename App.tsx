import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
// import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppStack } from './src/routes/AppStack.routes';
import { AuthProvider } from './src/hooks/useAuth';

export default function App(): JSX.Element {
  const [isLoadingIcons, setIsLoadingIcons] = useState(false);

  function cacheIcons() {
    return Font.loadAsync(Ionicons.font);
  }

  return (
    <>
      {isLoadingIcons ? (
        <AppLoading
          startAsync={cacheIcons}
          onFinish={() => setIsLoadingIcons(true)}
          onError={console.warn}
        />
      ) : (
        <AuthProvider>
          <StatusBar translucent backgroundColor="transparent" />
          <AppStack />
        </AuthProvider>
      )}
    </>
  );
}

<AuthProvider>
  <StatusBar translucent backgroundColor="transparent" />
  <AppStack />
</AuthProvider>;
