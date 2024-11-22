import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useMenu } from '../../MenuContext';

export default function Home({ navigation }) {
  const {menu, setMenu} = useMenu();
  const [precioTotal, setPrecioTotal] = useState(0);
  const [promedioHealthScore, setPromedioHealthScore] = useState(0);

  useEffect(() => {
    setPrecioTotal(menu.reduce((acc, plato) => acc + (plato.pricePerServing || 0), 0));
    setPromedioHealthScore(
      menu.length ? menu.reduce((acc, plato) => acc + (plato.healthScore || 0), 0) / menu.length : 0
    );
  }, [menu]);

  const eliminarPlato = (id) => setMenu(menu.filter(plato => plato.id !== id));
  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>Precio Total: ${precioTotal.toFixed(2)}</Text> 
      <Text style={styles.healthScoreText}>Promedio HealthScore: {promedioHealthScore.toFixed(2)}</Text> 
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.navigate('BuscarPlato', { setMenu, menu })}
      >
        <Text style={styles.searchButtonText}>Buscar Plato</Text>
      </TouchableOpacity>
     
     
     
     {
      <FlatList
        data={menu}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItemContainer}>
            <Text style={styles.menuItemTitle}>{item.title}</Text>  
            <Image style={styles.image} source={{ uri: item.image }}/>
            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => navigation.navigate('DetallePlato', { plato: item})} 
            >
              <Text style={styles.detailsButtonText}>Detalle</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => eliminarPlato(item.id)}
            >
              <Text style={styles.removeButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 30,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  healthScoreText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItemContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignItems:'center',
    justifyContent:'center',
  },
  menuItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    width:'100%',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width:'100%',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingBottom: 20,
  },
});
