import React from 'react';

import {
  ColorValue,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import { AntDesign } from "@expo/vector-icons";

import { styles } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  color: ColorValue;
  isLoading?: boolean;
  backgroundColor: ColorValue;
  icon?: React.ComponentProps<typeof AntDesign>['name'];
};

export const Button = ({ title, color, backgroundColor, icon, isLoading, ...rest }: Props) => (
  <TouchableOpacity
    activeOpacity={0.7}
    disabled={isLoading}
    style={[styles.button, { backgroundColor }]}
    {...rest}
  >
    {isLoading ? (
      <ActivityIndicator color={color} />
    ) : (
      <>
        <AntDesign name={icon} size={24} style={styles.icon} />
        <Text style={[styles.title, { color }]} >
          {title}
        </Text>
      </>
    )}
  </TouchableOpacity>
);
