import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import { auth, db } from '../../../firebaseConfig'; 
import styleLogin from '@/app/styles/loginStyle';

export default function LoginUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha e-mail e senha.");
      return;
    }

    try {
      setLoading(true);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

     
      const q = query(collection(db, "usuarios"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        
  
        const notaPreTeste = userData.notas?.pre_teste;

        console.log("VALOR RECUPERADO DO MAP NOTAS:", notaPreTeste);

        if (typeof notaPreTeste === 'number') {
          router.replace('/modules'); 
        } else {
          router.replace('/initialQuiz'); 
        }
      } else {
        router.replace('/initialQuiz');
      }

    } catch (error: any) {
      console.error(error);
      Alert.alert("Erro", "E-mail ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styleLogin.container}>
      <Text style={styleLogin.title}>Login AVA-BLS</Text>
      <View style={styleLogin.form}>
        <Text style={styleLogin.label}>E-mail</Text>
        <TextInput 
          style={styleLogin.input} 
          placeholder="exemplo@email.com" 
          value={email} 
          onChangeText={setEmail} 
          autoCapitalize="none" 
        />
        
        <Text style={styleLogin.label}>Senha</Text>
        <TextInput 
          style={styleLogin.input} 
          placeholder="Sua senha" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
        />

        <TouchableOpacity style={styleLogin.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styleLogin.buttonText}>Entrar</Text>}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styleLogin.registerLink} 
          onPress={() => router.push('/screens/registers/registerUser' as any)}
        >
          <Text style={styleLogin.registerText}>
            Não tem uma conta? <Text style={styleLogin.boldText}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

