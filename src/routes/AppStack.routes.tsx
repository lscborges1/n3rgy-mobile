import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Landing } from '../pages/Landing';
import { ConsumptionTabs } from './ConsumptionTabs.routes';

const { Navigator, Screen } = createStackNavigator();

export function AppStack(): JSX.Element {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#212B36' },
        }}
      >
        <Screen name="Landing" component={Landing} />
        <Screen name="ConsumptionTabs" component={ConsumptionTabs} />
      </Navigator>
    </NavigationContainer>
  );
}
