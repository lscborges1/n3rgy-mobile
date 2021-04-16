import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface HeatMapBlockProps {
  size: number;
  value: number;
  index: number;
  maximumValue: number;
  colorsPercentage: number[];
  colors: string[];
  onBlockPress: ({ value, index }) => void;
}

interface HeatMapProps {
  numberOfLines: number;
  values: number[];
  indexStart: number;
  colors: string[];
  colorsPercentage: number[];
  maximumValue: number;
  blocksSize: number;
  onBlockPress: ({ index, value }) => void;
}

function HeatMapBlock({
  size,
  value,
  index,
  maximumValue,
  colorsPercentage,
  colors,
  onBlockPress,
}: HeatMapBlockProps): JSX.Element {
  const valuePercentage = (value / maximumValue) * 100;
  let color;

  for (let i = 0; i < colorsPercentage.length; i += 1) {
    if (valuePercentage >= colorsPercentage[i]) color = colors[i];
    else break;
  }

  return (
    <TouchableOpacity
      onPress={() => onBlockPress({ value, index })}
      style={{
        borderRadius: 4,
        margin: 2,
        backgroundColor: color,
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 20, color: '#fff' }}>{index}</Text>
    </TouchableOpacity>
  );
}

function HeatMapColumn(children: ReactNode) {
  return <View>{children}</View>;
}

export function NewHeatMap({
  numberOfLines,
  values,
  indexStart,
  colors,
  colorsPercentage,
  maximumValue,
  blocksSize,
  onBlockPress,
}: HeatMapProps): JSX.Element {
  const maxValue = maximumValue;

  function generateBlocks(atualBlock: number) {
    const blocks = [] as JSX.Element[];
    for (let j = 0; j < numberOfLines; j += 1)
      blocks.push(
        <HeatMapBlock
          key={Math.random()}
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
  }

  const generateColumns = () => {
    const numberOfColumns = values.length / numberOfLines;
    const columns = [] as JSX.Element[];
    let atualBlock = 0;

    for (let i = 0; i < numberOfColumns; i += 1) {
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
}
