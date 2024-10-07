import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AppVeiculo from '../../components/AppVeiculo';
import * as Database from '../../database/Database';
import { Icon } from 'react-native-elements';

interface Veiculo {
  id: number;
  modelo: string;
  anoFabricacao: string;
  placa: string;
}

interface VeiculoScreenProps {
  route: {
    params?: any;
  };
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const VeiculoScreen: React.FC<VeiculoScreenProps> = ({ route, navigation }) => {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([
    { id: 1, modelo: "VW Gol", anoFabricacao: "2014", placa: "123A4BC" }, 
    { id: 2, modelo: "Chevrolet Onix", anoFabricacao: "2018", placa: "456D7EF" }, 
    { id: 3, modelo: "Citroën C3", anoFabricacao: "2015", placa: "890G1HI" },
  ]);

  const [modelo, setModelo] = useState<string>('');
  const [anoFabricacao, setAnoFabricacao] = useState<string>('');
  const [placa, setPlaca] = useState<string>('');

  useEffect(() => {
    const fetchVeiculos = async () => {
      const fetchedVeiculos = await Database.getVeiculos();
      setVeiculos(fetchedVeiculos);
    };
    fetchVeiculos();
  }, [route]);

  const handleModelChange = (modelo: string) => setModelo(modelo);
  const handleManufacturedYearChange = (anoFabricacao: string) => setAnoFabricacao(anoFabricacao);
  const handleLicensePlateChange = (placa: string) => setPlaca(placa);

  const handleButtonPress = async () => {
    const listVeiculo: Veiculo = { id: new Date().getTime(), modelo, anoFabricacao, placa };
    await Database.saveVeiculo(listVeiculo);
    navigation.navigate("AppVeiculo", listVeiculo);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionando Veiculos</Text>
      <View style={styles.inputContainer}> 
        <TextInput 
          style={styles.input} 
          onChangeText={handleModelChange}
          placeholder="Qual veiculo deseja adicionar?"
          clearButtonMode="always"
          value={modelo} 
        /> 
        <TextInput 
          style={styles.input} 
          onChangeText={handleManufacturedYearChange}
          placeholder="Qual é o ano de fabricação deste veículo?"
          clearButtonMode="always"
          value={anoFabricacao} 
        />
        <TextInput 
          style={styles.input} 
          onChangeText={handleLicensePlateChange}
          placeholder="Qual é a placa deste veículo?"
          clearButtonMode="always"
          value={placa} 
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
          contentContainerStyle={styles.veiculosContainer}>
          {veiculos.map(veiculo => (
              <AppVeiculo 
                key={veiculo.id} 
                id={veiculo.id} 
                veiculo={`${veiculo.modelo} do ano ${veiculo.anoFabricacao}, placa ${veiculo.placa}`}
                navigation={navigation} 
              />
          ))}
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
  },
  veiculosContainer: {
    paddingBottom: 20,
  },
});

export default VeiculoScreen;
