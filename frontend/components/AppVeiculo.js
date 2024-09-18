import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Database from './database/Database';
 
export default function AppVeiculo({ route, navigation }){
    const id = route.params ? route.params.id : undefined;
    const [modelo, setModelo] = useState('');
    const [anoFabricacao, setAnoFabricacao] = useState('');
    const [placa, setPlaca] = useState('');

    useEffect(() => {
      if(!route.params) return;
      setModelo(route.params.modelo);
      setAnoFabricacao(route.params.anoFabricacao.toString());
      setPlaca(route.params.placa);
    }, [route]);

    async function handleEditPress(){ 
        const veiculo = await Database.getVeiculo(props.id);
        props.navigation.navigate("AppVeiculo", veiculo);
    }

    function handleDeletePress(){ 
        Alert.alert(
            "Atenção",
            "Você tem certeza que deseja excluir este item?",
            [
                {
                text: "Não",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "Sim", onPress: () => {
                    Database.deleteItem(props.id)
                        .then(response => props.navigation.navigate("AppVeiculo", {id: props.id}));
                    }
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
          <Text style={styles.textVeiculo}>{props.veiculo}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
                style={styles.deleteButton}
                onPress={handleDeletePress} > 
                <Icon name="trash" color="white" size={18} />
            </TouchableOpacity> 
            <TouchableOpacity 
                style={styles.editButton} 
                onPress={handleEditPress}> 
                <Icon name="edit" color="white" size={18} />
            </TouchableOpacity>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      marginTop: 20,
      width: '100%'
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        paddingBottom: 10,
        marginTop: 10,
    },
    editButton: {
        marginLeft: 10,
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    deleteButton: {
        marginLeft: 10,
        height: 40,
        width: 40,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    textItem: {
        fontSize: 20,
    }
  });