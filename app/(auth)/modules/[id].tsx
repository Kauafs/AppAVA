import { useLocalSearchParams, Stack, useRouter } from 'expo-router'; 
import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'; 
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import styleList from '@/app/styles/listStyle';

export default function LessonsList() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter(); 
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const q = query(collection(db, "micromodulos"), where("moduloId", "==", id), orderBy("ordem", "asc"));
        const snap = await getDocs(q);
        setLessons(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) { 
        console.error(error); 
      } finally { 
        setLoading(false); 
      }
    };
    if (id) fetchLessons();
  }, [id]);

  return (
    <View style={styleList.container}>
      <Stack.Screen options={{ title: 'Aulas do Módulo' }} />
      {loading ? <ActivityIndicator size="large" color="#de1a1a" style={{ marginTop: 20 }} /> : (
        <FlatList
          data={lessons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styleList.card}
              onPress={() => router.push({
                pathname: "/(auth)/modules/player",
                params: { 
                  titulo: item.titulo,
                  descricao: item.descricao, 
                  url_video: item.url_video, 
                  url_imagem: item.url_imagem 
                }
              } as any)}
            >
              <Text style={styleList.title}>{item.ordem}. {item.titulo}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

