import React from 'react';

import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import LogoSvg from "../../assets/logo.svg";
import { useAuth } from '../../hooks/Auth';
import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

export function Header() {
  const { signOut, user } = useAuth();
  return (
    <View style={styles.container}>
      <LogoSvg />
      <View style={styles.logouButton}>
        {!!user && (
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        )}
        <UserPhoto imageUri={user?.avatar_url} />
      </View>
    </View>
  );
}
