import React from 'react';
import { StatusBar } from 'expo-status-bar';
// import { AppLoading } from 'expo';
// import { Ionicons } from '@expo/vector-icons';
// import * as Font from 'expo-font';
// import { isLoading } from 'expo-font';
// import { Alert } from 'react-native';
import { AppStack } from './src/routes/AppStack.routes';
import { AuthProvider } from './src/hooks/useAuth';

export default function App(): JSX.Element {
  // const { ionicons } = Ionicons.font;
  // const [isLoadingFonts, setIsLoadingFonts] = useState(true);

  // const loadIcons = () => Font.loadAsync({ name: 'ionicons', uri: ionicons });

  // useEffect(() => {
  //   try {
  //     loadIcons();
  //   } catch (e) {
  //     Alert.alert('Loading error', 'An error occured while loading icons.');
  //   }
  // });

  return (
    // <>
    //   {isLoading(ionicons) ? (
    //     <AppLoading />
    //   ) : (
    <AuthProvider>
      <StatusBar translucent backgroundColor="transparent" />
      <AppStack />
    </AuthProvider>
  );
}
