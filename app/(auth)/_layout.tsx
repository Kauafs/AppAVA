import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#de1a1a' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="initialQuiz" options={{ title: 'Nivelamento', headerLeft: () => null }} />
      <Stack.Screen name="modules/index" options={{ title: 'Meus Módulos' }} />
      <Stack.Screen name="modules/[id]" options={{ title: 'Aulas' }} />
    </Stack>
  );
}