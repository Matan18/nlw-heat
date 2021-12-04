import { api } from '../../services/api'
import styles from "./styles.module.scss";
import logoImg from '../../assets/logo.svg';
import { useEffect } from 'react';
import { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const messageQueue: IMessage[] = [];

socket.on('new_message', (newMessage: IMessage) => {
  messageQueue.push(newMessage);
})

export const MessageList = () => {
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
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [])

  useEffect(() => {
    api.get<IMessage[]>('/messages/last3').then(({ data }) => {
      setMessages(data);
    })
  }, []);

  return (
    <div className={styles.messageListWreapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages.map(message => (
          <li key={message.id} className={styles.message}>
            <p className={styles.messageContent}>{message.text}</p>
            <div className={styles.messageUser}>
              <a target="_blank" href={`https://github.com/${message.user.login}`} className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.login} />
              </a>
              <span>{message.user.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
