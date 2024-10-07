import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Database from '../database/Database';

interface AppVeiculoProps {
    id: number;
    veiculo: string;
    navigation: {
        navigate: (screen: string, params?: any) => void;
    };
}

const AppVeiculo: React.FC<AppVeiculoProps> = ({ id, veiculo, navigation }) => {
    const [modelo, setModelo] = useState('');
    const [anoFabricacao, setAnoFabricacao] = useState('');
    const [placa, setPlaca] = useState('');

    useEffect(() => {
        const fetchVeiculo = async () => {
            const fetchedVeiculo = await Database.getVeiculo(id);
            setModelo(fetchedVeiculo.modelo);
            setAnoFabricacao(fetchedVeiculo.anoFabricacao);
            setPlaca(fetchedVeiculo.placa);
        };
        if (id) {
            fetchVeiculo();
        }
    }, [id]);

    const handleEditPress = () => {
        navigation.navigate("AppVeiculo", { id });
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
                    text: "Sim", onPress: () => {
                        Database.deleteVeiculo(id)  // Changed here
                            .then(() => navigation.navigate("AppVeiculo", { id }));
                    }
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textItem}>{veiculo}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDeletePress}>
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
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    textItem: {
        fontSize: 20,
    }
});

export default AppVeiculo;
