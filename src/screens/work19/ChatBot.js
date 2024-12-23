import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ChatBot = () => {
  const [inputText, setInputText] = useState(''); // Kullanıcıdan alınan metin
  const [messages, setMessages] = useState([]); // Mesaj geçmişi
  const flatListRef = useRef(null); // FlatList için referans

  const handleSend = async () => {
    if (inputText.trim() === '') return;

    // Kullanıcı mesajını ekle
    const userMessage = { id: Date.now(), text: inputText, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // TextInput'u hemen temizle
    setInputText('');

    try {
      const url = 'http://172.20.10.12:5001/api/get-response'; // Flask API URL'si
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputText }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage = {
          id: Date.now() + 1,
          text: data.response || 'Yanıt alınamadı.',
          isUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]); // Bot yanıtını ekle
        scrollToEnd(); // Listeyi otomatik kaydır
      } else {
        const errorMessage = {
          id: Date.now() + 1,
          text: `Hata: ${response.status}`,
          isUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        scrollToEnd();
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: `Bağlantı hatası: ${error.message}`,
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      scrollToEnd();
    }
  };

  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const renderMessage = ({ item }) => {
    const messageStyle = item.isUser ? styles.userMessage : styles.botMessage;
    const containerStyle = item.isUser ? styles.userContainer : styles.botContainer;

    return (
      <View style={containerStyle}>
        <Text style={messageStyle}>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={scrollToEnd} // Yeni mesaj geldiğinde otomatik kaydır
      />
      <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mesajınızı yazın..."
          placeholderTextColor="#888"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Gönder</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F0F2',
  },
  messageList: {
    padding: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: windowWidth * 0.12,
    marginRight: 15,
    fontSize: windowWidth * 0.045,
    backgroundColor: '#F9F9F9',
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5, // Buton gölge efekti
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: windowWidth * 0.045,
  },
  userContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '70%',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5, 
    elevation: 5, // Mesaj kutusuna gölge efekti
  },
  botContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F1F1',
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '70%',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5, 
    elevation: 5, // Mesaj kutusuna gölge efekti
  },
  userMessage: {
    color: '#fff',
    fontSize: windowWidth * 0.045,
  },
  botMessage: {
    color: '#333',
    fontSize: windowWidth * 0.045,
  },
});

export default ChatBot;
