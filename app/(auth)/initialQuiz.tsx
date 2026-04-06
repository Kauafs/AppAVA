import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { collection, query, where, getDocs, doc, updateDoc, orderBy } from 'firebase/firestore'; 
import { auth, db } from '../../firebaseConfig'; 
import styleQuiz from '../styles/quizStyle';

export default function InitialQuiz() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0); 
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const q = query(collection(db, "avaliacoes"), where("tipo", "==", "nivelamento"), orderBy("ordem", "asc"));
        const snap = await getDocs(q);
        setQuestions(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) { 
        console.error("Erro busca quiz:", error); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchQuiz();
  }, []);

  const handleFinalize = async (finalScore: number) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, "usuarios"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docId = querySnapshot.docs[0].id;
          const userRef = doc(db, "usuarios", docId);

         
          await updateDoc(userRef, {
            "notas.pre_teste": finalScore,
            "data_nivelamento": new Date().toISOString()
          });

          console.log(`${finalScore} acertos gravados com sucesso!`);

          Alert.alert("Sucesso", `Nivelamento concluído! Você acertou ${finalScore} questões.`, [
            { text: "Ver Módulos", onPress: () => router.replace('/modules') }
          ]);
        }
      }
    } catch (e) {
      console.error("Erro ao salvar nota:", e);
      Alert.alert("Erro", "Não foi possível salvar sua nota.");
    }
  };

  const handleAnswer = (index: number) => {
   
    const isCorrect = index === questions[currentStep].respostacorreta;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinalize(newScore);
    }
  };

  if (loading) 
    return <ActivityIndicator size="large" color="#de1a1a" style={{flex:1}} />;
  if (questions.length === 0) 
    return <View style={styleQuiz.container}><Text>Sem perguntas cadastradas.</Text></View>;

  return (
    <View style={styleQuiz.container}>
      <Stack.Screen options={{ title: 'Avaliação Inicial', headerLeft: () => null }} />
      
      <View style={styleQuiz.header}>
        <Text style={styleQuiz.progress}>QUESTÃO {currentStep + 1} DE {questions.length}</Text>
        <View style={styleQuiz.progressBar}>
           <View style={[styleQuiz.progressFill, { width: `${((currentStep + 1) / questions.length) * 100}%` }]} />
        </View>
      </View>

      <Text style={styleQuiz.question}>{questions[currentStep].pergunta}</Text>
      
      <View style={styleQuiz.optionsContainer}>
        {questions[currentStep].opcoes.map((opt: string, idx: number) => (
          <TouchableOpacity key={idx} style={styleQuiz.option} onPress={() => handleAnswer(idx)}>
            <Text style={styleQuiz.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

