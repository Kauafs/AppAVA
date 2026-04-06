import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; 
import { useRouter, Stack } from 'expo-router';
import styleModule from '@/app/styles/modulesStyle';

export default function ModulesList() {
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const q = query(collection(db, "modulos"), orderBy("ordem", "asc"));
        const snap = await getDocs(q);
        setModules(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Erro ao buscar módulos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  if (loading) {
    return (
      <View style={styleModule.loaderContainer}>
        <ActivityIndicator size="large" color="#de1a1a" />
        <Text style={{ marginTop: 10 }}>Carregando trilha...</Text>
      </View>
    );
  }

  return (
    <View style={styleModule.container}>

      <Stack.Screen options={{ title: 'Módulos' }} />
      
      <Text style={styleModule.title}>Trilha de Aprendizado</Text>
      
      <FlatList
        data={modules}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styleModule.card}
    
            onPress={() => router.push(`/(auth)/modules/${item.id}`)}
          >
            <View style={styleModule.orderBadge}>
              <Text style={styleModule.orderText}>{item.ordem}</Text>
            </View>
            <Text style={styleModule.cardText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styleModule.empty}>Nenhum módulo encontrado.</Text>
        }
      />
    </View>
  );
}

