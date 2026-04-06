import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { db, auth } from '../../../firebaseConfig'; 
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { Stack } from 'expo-router';
import styleForum from '@/app/styles/forumStyle';

export default function Forum() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    const q = query(collection(db, "forum"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    const user = auth.currentUser;
    if (!user) return;

    try {
     
      const nomeAutor = user.displayName || user.email || "Estudante";

      await addDoc(collection(db, "forum"), {
        question: newMessage.trim(), 
        author: nomeAutor, 
        authorId: user.uid,
        status: "Pendente",
        createdAt: serverTimestamp(),
      });
      setNewMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styleForum.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <Stack.Screen options={{ title: 'Fórum de Dúvidas' }} />

      {loading ? (
        <ActivityIndicator size="large" color="#de1a1a" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          inverted 
          contentContainerStyle={{ padding: 15 }}
          renderItem={({ item }) => (
            <View style={styleForum.messageCard}>
              <Text style={styleForum.user}>{item.author}</Text>
              <Text style={styleForum.text}>{item.question}</Text>

              {item.resposta && (
                <View style={styleForum.replyBox}>
                  <Text style={styleForum.replyHeader}>✔ RESPOSTA DO TUTOR:</Text>
                  <Text style={styleForum.replyText}>{item.resposta}</Text>
                </View>
              )}
            </View>
          )}
        />
      )}

      <View style={styleForum.inputContainer}>
        <TextInput
          style={styleForum.input}
          placeholder="Digite sua dúvida..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity 
          style={[styleForum.sendBtn, { opacity: newMessage.trim() ? 1 : 0.5 }]} 
          onPress={sendMessage}
        >
          <Text style={styleForum.sendBtnText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
