import AsyncStorage from '@react-native-async-storage/async-storage';
 
async function saveVeiculo(listVeiculo){
    listVeiculo.id = id ? id : new Date().getTime()
    const savedVeiculos = await getVeiculos();
 
    if(id){
        const index = await savedVeiculos.findIndex(veiculo => veiculo.id === id);
        savedVeiculos[index] = listVeiculo;
    }
    else
      savedVeiculos.push(listVeiculo);
 
    return AsyncStorage.setVeiculo('veiculos', JSON.stringify(savedVeiculos));
}

function getVeiculos(){
    return AsyncStorage.getVeiculo('veiculos')
            .then(response => {
                if(response)
                    return Promise.resolve(JSON.parse(response));
                else
                    return Promise.resolve([]);
            })
}

async function getVeiculo(id){
    const savedVeiculos = await getVeiculos();
    return savedVeiculos.find(veiculo => veiculo.id === id);
}

async function deleteVeiculo(id){
    let savedVeiculos = await getVeiculos();
    const index = await savedVeiculos.findIndex(veiculo => veiculo.id === id);
    savedVeiculos.splice(index, 1);
    return AsyncStorage.setVeiculo('veiculos', JSON.stringify(savedVeiculos));
}

async function saveAdesivo(listAdesivo){
    listAdesivo.id = id ? id : new Date().getTime()
    const savedAdesivos = await getAdesivos();
 
    if(id){
        const index = await savedAdesivos.findIndex(adesivo => adesivo.id === id);
        savedAdesivos[index] = listAdesivo;
    }
    else
      savedAdesivos.push(listAdesivo);
 
    return AsyncStorage.setAdesivo('adesivos', JSON.stringify(savedAdesivos));
}

function getAdesivos(){
    return AsyncStorage.getAdesivo('adesivos')
            .then(response => {
                if(response)
                    return Promise.resolve(JSON.parse(response));
                else
                    return Promise.resolve([]);
            })
}

async function getAdesivo(id){
    const savedAdesivos = await getAdesivos();
    return savedAdesivos.find(adesivo => adesivo.id === id);
}

async function deleteAdesivo(id){
    let savedAdesivos = await getAdesivos();
    const index = await savedAdesivos.findIndex(adesivo => adesivo.id === id);
    savedAdesivos.splice(index, 1);
    return AsyncStorage.setAdesivo('adesivos', JSON.stringify(savedAdesivos));
}
 
module.exports = {
    saveVeiculo,
    getVeiculos,
    getVeiculo,
    deleteVeiculo,
    saveAdesivo,
    getAdesivos,
    getAdesivo,
    deleteAdesivo
}