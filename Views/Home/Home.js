import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../../api';
import { useMenu } from '../../MenuContext';
import MenuItem from '../../Components/MenuItem/MenuItem'; // Aca se acumulan los platos que agregas al menu, en teoria

export default function Home({ navigation }) {
  const [menu, setMenu] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [promedioHealthScore, setPromedioHealthScore] = useState(0);

  useEffect(() => {
    setPrecioTotal(menu.reduce((acc, plato) => acc + (plato.price || 0), 0));//no tiene nada en precio. Hay que ver porque no le llega
    setPromedioHealthScore(
      menu.length ? menu.reduce((acc, plato) => acc + (plato.healthScore || 0), 0) / menu.length : 0
    ); //no tiene nada en healthscore (promedio de platos saludables). Hay que ver porque no le llega
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

      <FlatList
        data={menu}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItemContainer}>
            <Text style={styles.menuItemTitle}>{item.title}</Text>
            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => navigation.navigate('DetallePlato', { plato: item, menu, setMenu })} 
            >
              <Text style={styles.detailsButtonText}>Detalle</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => navigation.navigate('Menu')}
            >
              <Text style={styles.menuButtonText}>Ir al Menú</Text>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
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
