import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export default function AddScreen({ navigation }) {
    const [adesivos, setAdesivos] = useState([
        {id: 1, quantidade: 5, descricao: "time de futebol" }, 
        {id: 2, quantidade: 1, descricao: "família" }, 
        {id: 3, quantidade: 1, descricao: "evento de rock" }, 
    ]);

    async function handleButtonPress(){ 
        const listAdesivo = {id: new Date().getTime(), descricao, quantidade: parseInt(quantidade)};
        let savedAdesivo = [];
        const response = await AsyncStorage.getAdesivo('adesivos');
        
        if(response) savedAdesivo = JSON.parse(response);
        savedAdesivos.push(listAdesivo);
       
        await AsyncStorage.setAdesivo('adesivos', JSON.stringify(savedAdesivos));
        navigation.navigate("AppList", listAdesivo);
    }
    
    const [descricao, setDescricao] = useState(''); 
    const [quantidade, setQuantidade] = useState('');
    
    function handleDescriptionChange(descricao){ setDescricao(descricao); } 
    function handleQuantityChange(quantidade){ setQuantidade(quantidade); }
    function handleButtonPress(){ 
    console.log({id: new Date().getTime(), descricao, quantidade}); 
    navigation.navigate("");
    }

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Adicionando Adesivos</Text>
          <View style={styles.inputContainer}> 
            <TextInput 
              style={styles.input} 
              placeholder="Qual adesivo deseja adicionar?"
              clearButtonMode="always" /> 
            <TextInput 
              style={styles.input}  
              placeholder="Digite a quantidade" 
              keyboardType={'numeric'}
              clearButtonMode="always" /> 
            <TouchableOpacity style={styles.addButton}> 
              <Text style={styles.buttonText}>Adicionar</Text> 
            </TouchableOpacity> 
          </View>
          <StatusBar style="light" />
          <ScrollView 
              style={styles.scrollContainer}
              contentContainerStyle={styles.itemsContainer}>
              { adesivos.map(adesivo => {
                  return <AddScreen key={adesivo.id} id={adesivo.id} adesivo={adesivo.quantidade + '  de ' + adesivo.descricao} />
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
    addButton: {
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