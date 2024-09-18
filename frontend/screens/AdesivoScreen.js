import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Database from './database/Database';
import AppAdesivo from '../components/AppAdesivo';
 
export default function AdesivoScreen({ route, navigation }) {
  const [adesivo, setAdesivo] = useState([
    {id: 1, nome: "time de futebol" }, 
    {id: 2, nome: "família" }, 
    {id: 3, nome: "evento de rock" }, 
  ]);

  const [nome, setNome] = useState('');

  useEffect(() => {
    Database.getAdesivos().then(adesivos => setAdesivos(adesivos));
  }, [route]);
   
  function handleNameChange(nome){ setNome(nome); }
  async function handleButtonPress(){ 
    const listAdesivo = {id: new Date().getTime(), nome};
    let savedAdesivos = [];
    const response = await AsyncStorage.getAdesivo('adesivos');
    
    if(response) savedAdesivos = JSON.parse(response);
    savedAdesivos.push(listAdesivo);
   
    await AsyncStorage.setAdesivo('adesivos', JSON.stringify(savedAdesivos));
    navigation.navigate("VeiculoScreen", listAdesivo);
  }

    return (
      <View style={styles.container}>
          <Text style={styles.title}>Adesivos</Text>
          <View style={styles.inputContainer}> 
            <TextInput 
              style={styles.input} 
              onChangeText={handleNameChange}
              placeholder="Qual adesivo deseja adicionar?"
              clearButtonMode="always" 
              value={nome} />
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
              contentContainerStyle={styles.adesivosContainer}>
              { adesivo.map(adesivo => {
                  return <AddScreen 
                  key={adesivo.id} 
                  id={adesivo.id} 
                  veiculo={ adesivo.nome }
                  navigation={navigation} />
              }) }
          </ScrollView>
        </View>
  );
}
 
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
    backgroundColor: '#fff'
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch'
  },
  button: {
    marginTop: 10,
    height: 60,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});