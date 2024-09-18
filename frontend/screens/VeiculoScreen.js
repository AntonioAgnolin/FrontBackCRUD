import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AppVeiculo from '../components/AppVeiculo';
import Database from './database/Database';
 
export default function VeiculoScreen({ route, navigation }) {
  const [veiculo, setVeiculo] = useState([
    {id: 1, modelo: "VW Gol", anoFabricacao: "2014", placa: "123A4BC" }, 
    {id: 2, modelo: "Chevrolet Onix", anoFabricacao: "2018", placa: "456D7EF" }, 
    {id: 3, modelo: "Citroën C3", anoFabricacao: "2015", placa: "890G1HI" },
  ]);

  const [modelo, setModelo] = useState('');
  const [anoFabricacao, setAnoFabricacao] = useState('');
  const [placa, setPlaca] = useState('');

  useEffect(() => {
    Database.getVeiculos().then(veiculos => setVeiculos(veiculos));
  }, [route]);
   
  function handleModelChange(modelo){ setModelo(modelo); }
  function handleManufacturedYearChange(anoFabricacao){ setAnoFabricacao(anoFabricacao); }
  function handleLicensePlateChange(placa){ setPlaca(placa); }
  Database.saveVeiculo(listVeiculo)
    .then(response => navigation.navigate("AppVeiculo", listVeiculo));

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Adicionando Veiculos</Text>
          <View style={styles.inputContainer}> 
            <TextInput 
              style={styles.input} 
              onChangeText={handleModelChange}
              placeholder="Qual veiculo deseja adicionar?"
              clearButtonMode="always"
              value={modelo} /> 
            <TextInput 
              style={styles.input} 
              onChangeText={handleManufacturedYearChange}
              placeholder="Qual é o ano de fabricação deste veículo?"
              clearButtonMode="always"
              value={anoFabricacao.toString()} />
            <TextInput 
              style={styles.input} 
              onChangeText={handleLicensePlateChange}
              placeholder="Qual é a placa deste veículo?"
              clearButtonMode="always"
              value={placa} /> 
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
              contentContainerStyle={styles.veiculosContainer}>
              { veiculos.map(veiculo => {
                  return <AddScreen 
                  key={veiculo.id} 
                  id={veiculo.id} 
                  veiculo={ veiculo.modelo + ' do ano ' + veiculo.anoFabricacao + ', placa ' + veiculo.placa}
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