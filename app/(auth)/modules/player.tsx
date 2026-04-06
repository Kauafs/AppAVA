import React from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import stylePlayer from '@/app/styles/playerStyle';


export default function VideoPlayer() {
  const { url_video, titulo, descricao, url_imagem } = useLocalSearchParams();
  const router = useRouter();

  
  const imageUri = url_imagem 
    ? String(url_imagem).trim().replace("/o/aulas/uploads/", "/o/aulas%2Fuploads%2F") 
    : null;

  
  const videoUri = url_video ? String(url_video).trim() : null;

  return (
    <View style={stylePlayer.container}>
      <Stack.Screen options={{ title: 'Aula' }} />
      
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <Text style={stylePlayer.mainTitle}>{titulo}</Text>

        {descricao ? <Text style={stylePlayer.descText}>{String(descricao)}</Text> : null}

        {imageUri && (
          <View style={stylePlayer.mediaBox}>
            <Text style={stylePlayer.label}>Esquema Visual:</Text>
            <View style={stylePlayer.imageWrapper}>
              <Image source={{ uri: imageUri }} style={stylePlayer.image} resizeMode="contain" />
            </View>
          </View>
        )}

        {videoUri && (
          <View style={stylePlayer.mediaBox}>
            <Text style={stylePlayer.label}>Demonstração em Vídeo:</Text>
            <View style={stylePlayer.videoContainer}>
              <WebView 
                source={{ uri: videoUri }} 
                style={{ flex: 1 }} 
                javaScriptEnabled={true}
                domStorageEnabled={true}
              />
            </View>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity 
        style={stylePlayer.fab} 
        onPress={() => router.push("/(auth)/modules/forum")}
      >
        <Text style={stylePlayer.fabIcon}>💬</Text>
      </TouchableOpacity>
    </View>
  );
}
