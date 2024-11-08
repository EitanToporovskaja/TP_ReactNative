import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet, TouchableOpacity, Alert  } from 'react-native';
import api from '../../api';
import { useMenu } from '../../MenuContext';

export default function BuscarPlato({ navigation }) {
  const { setMenu, menu } = useMenu();
  const [search, setSearch] = useState('');
  const [resultados, setResultados] = useState([]);

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
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('DetallePlato', { plato: item })}>
              <Text style={styles.buttonText}>Ver Detalles</Text>
            </TouchableOpacity>
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});