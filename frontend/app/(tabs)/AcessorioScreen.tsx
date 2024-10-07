import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Database from '../../database/Database';
import AppAcessorio from '../../components/AppAcessorio';
import { Icon } from 'react-native-elements';

interface Acessorio {
  id: number;
  nome: string;
}

interface AcessorioScreenProps {
  route?: {
    params?: any;
  };
  navigation?: {
    navigate: (screen: string, params?: any) => void;
  };
}

const AcessorioScreen: React.FC<AcessorioScreenProps> = ({ route, navigation }) => {
  const [acessorios, setAcessorios] = useState<Acessorio[]>([
    { id: 1, nome: "time de futebol" },
    { id: 2, nome: "família" },
    { id: 3, nome: "evento de rock" },
  ]);

  const [nome, setNome] = useState<string>('');

  useEffect(() => {
    const fetchAcessorios = async () => {
      const fetchedAcessorios = await Database.getAcessorios();
      setAcessorios(fetchedAcessorios);
    };

    fetchAcessorios();
  }, [route]);

  const handleNameChange = (nome: string) => setNome(nome);

  const handleButtonPress = async () => {
    const listAcessorio = { id: new Date().getTime(), nome };
    let savedAcessorios: Acessorio[] = [];
    const response = await AsyncStorage.getItem('acessorios');

    if (response) {
      savedAcessorios = JSON.parse(response);
    }
    
    savedAcessorios.push(listAcessorio);
    await AsyncStorage.setItem('acessorios', JSON.stringify(savedAcessorios));
    navigation.navigate("VeiculoScreen", listAcessorio);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acessórios</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleNameChange}
          placeholder="Qual acessório deseja adicionar?"
          clearButtonMode="always"
          value={nome}
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <View style={styles.buttonContainer}>
            <Icon name="save" size={22} color="white" />
            <Text style={styles.buttonText}>Salvar</Text>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.acessoriosContainer}>
        {acessorios.map(acessorio => (
          <AppAcessorio
            key={acessorio.id}
            id={acessorio.id}
            veiculo={acessorio.nome}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D93600',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    width: '90%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    height: 60,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 24,
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },
  buttonContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContainer: {
    width: '100%',
    flex: 1,
  },
  acessoriosContainer: { 
    padding: 10,
  },
});

export default AcessorioScreen;
