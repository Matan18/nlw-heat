import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Header } from '../../components/Header';
import { MessageList } from '../../components/MessageList';
import { SendMessageForm } from '../../components/SendMessageForm';
import { SignInBox } from '../../components/SignInBox';
import { useAuth } from '../../hooks/Auth';

import { styles } from "./styles";

export const Home = () => {
  const { user } = useAuth();
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header />
      <MessageList />
      {!!user ? (
        <SendMessageForm />
      ) : (
        <SignInBox />
      )}
    </KeyboardAvoidingView>
  );
}
