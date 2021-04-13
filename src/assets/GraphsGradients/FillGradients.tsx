import React from 'react';
import { GradientProps } from '@connectedcars/react-native-slide-charts';
import { LinearGradient, Stop } from 'react-native-svg';

export const BarChartFillGradient = (props: GradientProps): JSX.Element => {
  return (
    <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" {...props}>
      <Stop stopColor="#212b36" offset="0%" stopOpacity="0.4" />
      <Stop stopColor="#212b36" offset="100%" stopOpacity="0.4" />
    </LinearGradient>
  );
};

export const AreaChartFillGradient = (props: GradientProps): JSX.Element => {
  return (
    <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" {...props}>
      <Stop stopColor="#212b36" offset="0%" stopOpacity="0.2" />
      <Stop stopColor="#FFFFFF" offset="100%" stopOpacity="0.2" />
    </LinearGradient>
  );
};
