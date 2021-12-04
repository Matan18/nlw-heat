import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import {
  ScrollView,
} from 'react-native';
import { api } from '../../services/api';
import { io } from "socket.io-client";

import { Message } from '../Message';

import { styles } from './styles';

const messageQueue: IMessage[] = [];

const socket = io(String(api.defaults.baseURL));

socket.on('new_message', (message) => messageQueue.push(message));

export function MessageList() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messageQueue.length > 0) {
        setMessages(prev => ([
          messageQueue[0],
          prev[0],
          prev[1]
        ].filter(Boolean)))
        messageQueue.shift();
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [])

  useEffect(() => {
    api.get<IMessage[]>('/messages/last3').then(({ data }) => {
      setMessages(data);
    });
  }, []);

  return (
    <ScrollView style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never">
      {messages.map(message =>
        <Message key={message.id} message={message} />
      )}
    </ScrollView>
  );
}
