import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { Landing } from '../pages/Landing';
import { SignUp } from '../pages/SignUp';
import { ConsumptionTabs } from './ConsumptionTabs.routes';

const Slide = {
  ...TransitionPresets.SlideFromRightIOS,
};

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
        <Screen options={Slide} name="Landing" component={Landing} />
        <Screen options={Slide} name="SignUp" component={SignUp} />
        <Screen
          options={Slide}
          name="ConsumptionTabs"
          component={ConsumptionTabs}
        />
      </Navigator>
    </NavigationContainer>
  );
}
