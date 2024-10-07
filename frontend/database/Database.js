import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveVeiculo(listVeiculo, id) {
    listVeiculo.id = id ? id : new Date().getTime();
    const savedVeiculos = await getVeiculos();

    if (id) {
        const index = savedVeiculos.findIndex(veiculo => veiculo.id === id);
        if (index !== -1) {
            savedVeiculos[index] = listVeiculo;
        }
    } else {
        savedVeiculos.push(listVeiculo);
    }

    return AsyncStorage.setItem('veiculos', JSON.stringify(savedVeiculos));
}

async function getVeiculos() {
    const response = await AsyncStorage.getItem('veiculos');
    return response ? JSON.parse(response) : [];
}

async function getVeiculo(id) {
    const savedVeiculos = await getVeiculos();
    return savedVeiculos.find(veiculo => veiculo.id === id);
}

async function deleteVeiculo(id) {
    let savedVeiculos = await getVeiculos();
    const index = savedVeiculos.findIndex(veiculo => veiculo.id === id);
    if (index !== -1) {
        savedVeiculos.splice(index, 1);
    }
    return AsyncStorage.setItem('veiculos', JSON.stringify(savedVeiculos));
}

async function saveAcessorio(listAcessorio, id) {
    listAcessorio.id = id ? id : new Date().getTime();
    const savedAcessorios = await getAcessorios();

    if (id) {
        const index = savedAcessorios.findIndex(acessorio => acessorio.id === id);
        if (index !== -1) {
            savedAcessorios[index] = listAcessorio;
        }
    } else {
        savedAcessorios.push(listAcessorio);
    }

    return AsyncStorage.setItem('acessorios', JSON.stringify(savedAcessorios));
}

async function getAcessorios() {
    const response = await AsyncStorage.getItem('acessorios');
    return response ? JSON.parse(response) : [];
}

async function getAcessorio(id) {
    const savedAcessorios = await getAcessorios();
    return savedAcessorios.find(acessorio => acessorio.id === id);
}

async function deleteAcessorio(id) {
    let savedAcessorios = await getAcessorios();
    const index = savedAcessorios.findIndex(acessorio => acessorio.id === id);
    if (index !== -1) {
        savedAcessorios.splice(index, 1);
    }
    return AsyncStorage.setItem('acessorios', JSON.stringify(savedAcessorios));
}

export {
    saveVeiculo,
    getVeiculos,
    getVeiculo,
    deleteVeiculo,
    saveAcessorio,
    getAcessorios,
    getAcessorio,
    deleteAcessorio
};
