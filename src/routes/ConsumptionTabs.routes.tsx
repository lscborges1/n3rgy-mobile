import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import { Electricity } from '../pages/Electricity';
import { Gas } from '../pages/Gas';
import { SelectedDayProvider } from '../hooks/useSelectedDay';

const { Navigator, Screen } = createBottomTabNavigator();

interface tabBarProps {
  color: string;
  size: number;
  focused: boolean;
}

export function ConsumptionTabs(): JSX.Element {
  return (
    <SelectedDayProvider>
      <Navigator
        tabBarOptions={{
          style: {
            elevation: 0,
            shadowOpacity: 0,
            height: 64,
          },
          tabStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
          iconStyle: {
            flex: 0,
            width: 20,
            height: 20,
          },
          labelStyle: {
            fontFamily: 'Archivo_700Bold',
            fontSize: 13,
            marginLeft: 16,
          },
          inactiveBackgroundColor: '#fafafc',
          activeBackgroundColor: '#ffffff',
          activeTintColor: '#ebab21',
        }}
      >
        <Screen
          name="Electricity"
          component={Electricity}
          options={{
            tabBarLabel: 'Electricity',
            tabBarIcon: ({ color, size, focused }: tabBarProps) => {
              return (
                <Ionicons
                  name="flash"
                  size={size}
                  color={focused ? '#ebab21' : color}
                />
              );
            },
          }}
        />

        <Screen
          name="Gas"
          component={Gas}
          options={{
            tabBarLabel: 'Gas',

            tabBarIcon: ({ color, size, focused }: tabBarProps) => {
              return (
                <Ionicons
                  name="cloudy-outline"
                  size={size}
                  color={focused ? '#ebab21' : color}
                />
              );
            },
          }}
        />
      </Navigator>
    </SelectedDayProvider>
  );
}
