import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const HeatMapBlock = ({
  size,
  value,
  index,
  colors,
  colorsPercentage,
  maximumValue,
  onBlockPress,
  style,
}) => {
  const valuePercentage = (value / maximumValue) * 100;
  let color;

  for (let i = 0; i < colorsPercentage.length; i++) {
    if (valuePercentage >= colorsPercentage[i]) color = colors[i];
    else break;
  }

  if (!color) return null;

  return (
    <TouchableOpacity
      onPress={() => onBlockPress({ value, index })}
      style={[
        styles.heatMapBlock,
        { backgroundColor: color, width: size, height: size ,
          alignItems: 'center', justifyContent: 'center'},
        style,
      ]}
    >
    <Text style={{fontSize:20, color:"#fff"}}>{index}</Text>
    </TouchableOpacity>
  );
};

const HeatMapColumn = ({ children }) => (
  <View style={styles.heatMapColumn}>{children}</View>
);

const HeatMap = ({
  numberOfLines,
  values,
  indexStart,
  colors,
  colorsPercentage,
  maximumValue,
  blocksSize,
  onBlockPress,
  blocksStyle,
}) => {
  const maxValue = maximumValue;

  const generateBlocks = atualBlock => {
    const blocks = [];
    for (let j = 0; j < numberOfLines; j++)
      blocks.push(
        <HeatMapBlock
          key={Math.random()}
          style={blocksStyle}
          size={blocksSize}
          index={j + atualBlock + indexStart}
          value={values[j + atualBlock]}
          colors={colors}
          colorsPercentage={colorsPercentage}
          onBlockPress={onBlockPress}
          maximumValue={maxValue}
        />,
      );
    return blocks;
  };

  const generateColumns = () => {
    const numberOfColumns = values.length / numberOfLines;
    const columns = [];
    let atualBlock = 0;

    for (let i = 0; i < numberOfColumns; i++) {
      columns.push(
        <HeatMapColumn key={Math.random()}>
          {generateBlocks(atualBlock)}
        </HeatMapColumn>,
      );
      atualBlock += numberOfLines;
    }

    return columns;
  };

  return <ScrollView horizontal>{generateColumns()}</ScrollView>;
};

HeatMap.propTypes = {
  numberOfLines: PropTypes.number,
  values: PropTypes.array,
  colors: PropTypes.array,
  colorsPercentage: PropTypes.array,
  maximumValue: PropTypes.string,
  blocksSize: PropTypes.number,
  // Optionals
  indexStart: PropTypes.number,
  onBlockPress: PropTypes.func,
  blocksStyle: PropTypes.object,
};

HeatMap.defaultProps = {
  numberOfLines: 7,
  values: [],
  colors: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  colorsPercentage: [0, 0.00001, 41, 60, 80],
  maximumValue: 'relative',
  blocksSize: 30,
  // Optionals
  indexStart: 0,
  onBlockPress: () => {},
  blocksStyle: {},
};

export default HeatMap;
