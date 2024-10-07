import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import * as Database from '../database/Database';

interface AppAcessorioProps {
  id: number;
  veiculo: string;
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const AppAcessorio: React.FC<AppAcessorioProps> = ({ id, veiculo, navigation }) => {
  const [nome, setNome] = useState('');

  useEffect(() => {
    setNome(veiculo);
  }, [veiculo]);

  const handleEditPress = async () => {
    const acessorio = await Database.getAcessorio(id);
    navigation.navigate("AppAcessorio", acessorio);
  };

  const handleDeletePress = () => {
    Alert.alert(
      "Atenção",
      "Você tem certeza que deseja excluir este item?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "Sim", 
          onPress: () => {
            Database.deleteAcessorio(id)
              .then(() => navigation.navigate("AcessorioScreen"));
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textItem}>{nome}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDeletePress} 
        > 
          <Icon name="trash" color="white" size={18} />
        </TouchableOpacity> 
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={handleEditPress}
        > 
          <Icon name="edit" color="white" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  textItem: {
    fontSize: 20,
  }
});

export default AppAcessorio;
