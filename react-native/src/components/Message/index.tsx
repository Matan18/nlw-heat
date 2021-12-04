import { MotiView } from 'moti';
import React from 'react';

import {
  Text,
  View
} from 'react-native';
import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

type Props = {
  message: IMessage,
}

export const Message = ({ message }: Props) => (
  <MotiView
    from={{ opacity: 0, translateY: -50 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ type: 'timing', duration: 700 }}
    style={styles.container}
  >
    <Text style={styles.message}>{message.text}</Text>

    <View style={styles.footer}>
      <UserPhoto sizes="SMALL" imageUri={message.user.avatar_url} />
      <Text style={styles.userName}>{message.user.name}</Text>
    </View>
  </MotiView>
);
