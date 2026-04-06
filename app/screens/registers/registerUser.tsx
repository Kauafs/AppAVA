import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import { useAuth, Vinculo, Curso, Genero } from '../../../src/hooks/userRegisters';
import styleRegister from '@/app/styles/registerStyle';

export default function CadastroScreen() {
  
  const { realizarCadastro } = useAuth();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [vinculo, setVinculo] = useState<Vinculo>('Discente');
  const [curso, setCurso] = useState<Curso>('Medicina');
  const [genero, setGenero] = useState<Genero>('Masculino');
  const [semestre, setSemestre] = useState('');
  const [celular, setCelular] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [experienciaPrevia, setExperienciaPrevia] = useState(false);
  const [termoTCLE, setTermoTCLE] = useState(false);

  const handleCadastro = async () => {
   
    if (!termoTCLE) {
      Alert.alert("Aviso", "Você precisa aceitar o termo TCLE para participar da pesquisa.");
      return;
    }

    const cursoFinal = vinculo === 'Colaborador' ? 'Outro' : curso;
    const valorSemestre = vinculo === 'Discente' ? (parseInt(semestre) || 0) : 0;

    const result = await realizarCadastro({
      nome, 
      cpf, 
      email, 
      senha, 
      vinculo, 
      curso: cursoFinal,
      genero,
      semestre: valorSemestre,
      celular, 
      dataNascimento, 
      experienciaPrevia, 
      termoTCLE
    });

    if (result.success) {
      Alert.alert("Sucesso!", "Cadastro realizado com sucesso.");
    } else {
      Alert.alert("Erro", result.error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styleRegister.scrollContainer}>
      <Text style={styleRegister.title}>Cadastro de Participante</Text>


      <Text style={styleRegister.label}>Nome Completo</Text>
      <TextInput style={styleRegister.input} placeholder="Ex: Felipe Silva" onChangeText={setNome} />

      <Text style={styleRegister.label}>CPF</Text>
      <TextInput style={styleRegister.input} placeholder="000.000.000-00" keyboardType="numeric" onChangeText={setCpf} />


      <Text style={styleRegister.label}>Gênero</Text>
      <View style={styleRegister.pickerWrapper}>
        <Picker selectedValue={genero} onValueChange={(item) => setGenero(item)} style={styleRegister.picker}>
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Feminino" value="Feminino" />
          <Picker.Item label="Outro" value="Outro" />
          <Picker.Item label="Prefiro não dizer" value="Prefiro não dizer" />
        </Picker>
      </View>

      <Text style={styleRegister.label}>Vínculo com a Instituição</Text>
      <View style={styleRegister.pickerWrapper}>
        <Picker selectedValue={vinculo} onValueChange={(item) => setVinculo(item)} style={styleRegister.picker}>
          <Picker.Item label="Discente (Aluno)" value="Discente" />
          <Picker.Item label="Docente (Professor)" value="Docente" />
          <Picker.Item label="Colaborador (Funcionário)" value="Colaborador" />
        </Picker>
      </View>

      {vinculo !== 'Colaborador' && (
        <View>
          <Text style={styleRegister.label}>Curso</Text>
          <View style={styleRegister.pickerWrapper}>
            <Picker selectedValue={curso} onValueChange={(item) => setCurso(item)} style={styleRegister.picker}>
              <Picker.Item label="Medicina" value="Medicina" />
              <Picker.Item label="Enfermagem" value="Enfermagem" />
              <Picker.Item label="Nutrição" value="Nutrição" />
              <Picker.Item label="Fisioterapia" value="Fisioterapia" />
            </Picker>
          </View>
        </View>
      )}

      {vinculo === 'Discente' && (
        <View>
          <Text style={styleRegister.label}>Semestre Atual</Text>
          <TextInput 
            style={styleRegister.input} 
            placeholder="Ex: 5" 
            keyboardType="numeric" 
            value={semestre}
            onChangeText={setSemestre} 
          />
        </View>
      )}

      <Text style={styleRegister.label}>E-mail Institucional</Text>
      <TextInput style={styleRegister.input} placeholder="email@exemplo.com" keyboardType="email-address" onChangeText={setEmail} />

      <Text style={styleRegister.label}>Senha</Text>
      <TextInput style={styleRegister.input} secureTextEntry placeholder="Mínimo 6 caracteres" onChangeText={setSenha} />

      <Text style={styleRegister.label}>Celular</Text>
      <TextInput style={styleRegister.input} placeholder="(82) 99999-9999" keyboardType="phone-pad" onChangeText={setCelular} />

      <Text style={styleRegister.label}>Data de Nascimento</Text>
      <TextInput style={styleRegister.input} placeholder="DD/MM/AAAA" onChangeText={setDataNascimento} />

      <View style={styleRegister.checkboxContainer}>
        <Checkbox value={experienciaPrevia} onValueChange={setExperienciaPrevia} color={experienciaPrevia ? '#d32f2f' : undefined} />
        <Text style={styleRegister.checkboxLabel}>Possui experiência prévia em BLS?</Text>
      </View>

      <View style={styleRegister.checkboxContainer}>
        <Checkbox value={termoTCLE} onValueChange={setTermoTCLE} color={termoTCLE ? '#d32f2f' : undefined} />
        <Text style={styleRegister.checkboxLabel}>Aceito os termos do TCLE (Pesquisa)</Text>
      </View>

      <TouchableOpacity style={styleRegister.button} onPress={handleCadastro}>
        <Text style={styleRegister.buttonText}>Finalizar Cadastro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

