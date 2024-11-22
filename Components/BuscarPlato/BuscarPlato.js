import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert ,Image } from 'react-native';
import api from '../../api';
import { useMenu } from '../../MenuContext';

export default function BuscarPlato({ navigation }) {
  const { menu, agregarOEliminarPlato, obtenerDetalle } = useMenu();
  const [search, setSearch] = useState('');
  const [resultados, setResultados] = useState([]);
 // const [detalle,setDetalle] = useState([]);



  const buscarPlatos = async () => {
    if (search.length > 2) {
      const response = await api.get('/recipes/complexSearch', { params: { query: search } });
      setResultados(response.data.results);
    }
    else
    {
      Alert.alert("Minimo 3 caracteres para efectuar la busqueda");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar plato"
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={buscarPlatos}
      />
      
      <FlatList
        data={resultados}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
                  <Text style={styles.title}>{item.title}</Text>
            <Image style={styles.image} source={{uri: item.image}}/>
      
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('DetallePlato', { plato: item })}>
              <Text style={styles.buttonText}>Ver Detalles</Text>
              </TouchableOpacity>
         {  <TouchableOpacity 
  style={styles.button} 
  onPress={async () => {
    try {
      const resultado = await obtenerDetalle(item);
      agregarOEliminarPlato(resultado); 
    } catch (error) {
      console.error("Error al obtener el detalle del plato:", error);
    }
  }}
>
  <Text style={styles.buttonText}>
    {menu.some(p => p.id === item.id) ? "Eliminar del menú" : "Agregar al menú"}
  </Text>
</TouchableOpacity>}
            
          </View>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 15,
  },  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 30,
  },
  searchInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20, // Add some vertical padding to the card
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginVertical: 10, // Add some vertical margin to the buttons
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});