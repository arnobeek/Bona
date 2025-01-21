import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (data) => {
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [data])
      );
    });

    // Load initial messages (optional)
    setMessages([
      {
        _id: 1,
        text: 'Hello!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'User Name',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);

    return () => {
      socket.off('message');
    };
  }, []);

  const onSend = useCallback((newMessages = []) => {
    // Emit the message to the server
    socket.emit('message', newMessages[0]);
    setMessages((prevMessages) =>
      GiftedChat.append(prevMessages, newMessages)
    );
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#4caf50', // Green for sent messages
          },
          left: {
            backgroundColor: '#e0e0e0', // Grey for received messages
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#4caf50" />
        </View>
      </Send>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: 1, // Current user ID
        name: 'You',
        avatar: 'https://placeimg.com/140/140/any',
      }}
      renderBubble={renderBubble}
      renderSend={renderSend}
      alwaysShowSend
      scrollToBottom
      showUserAvatar
    />
  );
};

const styles = StyleSheet.create({
  sendButton: {
    marginRight: 10,
    marginBottom: 5,
  },
});

export default ChatScreen;