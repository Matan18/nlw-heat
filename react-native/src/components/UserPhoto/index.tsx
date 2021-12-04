import React from 'react';

import {
  Image,
  View
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

import avatarImg from "../../assets/avatar.png";

import { styles } from './styles';
import { COLORS } from '../../theme';


type SizeEnum = 'SMALL' | 'NORMAL';

type ISizesStyles = {
  [key in SizeEnum]: {
    containerSize: number;
    avatarSize: number;
  }
}

const SIZES: ISizesStyles = {
  SMALL: {
    containerSize: 32,
    avatarSize: 28,
  },
  NORMAL: {
    containerSize: 48,
    avatarSize: 42,
  }
}

type Props = {
  imageUri?: string;
  sizes?: SizeEnum;
}

const AVATAR_DEFAULT = Image.resolveAssetSource(avatarImg).uri;

export function UserPhoto({ imageUri: uri = AVATAR_DEFAULT, sizes = 'NORMAL' }: Props) {
  const { containerSize, avatarSize } = SIZES[sizes];
  return (
    <LinearGradient colors={[COLORS.PINK, COLORS.YELLOW]}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.9, y: 1 }}
      style={[styles.container, {
        width: containerSize,
        height: containerSize,
        borderRadius: containerSize / 2
      }]}
    >
      <Image style={[styles.avatar, {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize / 2
      }]} source={{ uri }} />
    </LinearGradient>
  );
}
