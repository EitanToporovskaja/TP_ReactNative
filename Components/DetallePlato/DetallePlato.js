import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useMenu } from '../../MenuContext';
import api from '../../api';//donde esta linkeada la api. En el siguiente link debes logearte para poder acceder a los platos: https://spoonacular.com/food-api/docs#Search-Recipes-Complex

export default function DetallePlato({ route, navigation }) {
  const { plato } = route.params;
  const { menu, setMenu } = useMenu();
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    const obtenerDetalle = async () => {
      try {
        const response = await api.get(`/recipes/${plato.id}/information`);
        setDetalle(response.data);
      } catch (error) {
        console.error("Error al obtener el detalle del plato:", error);
      }
    };
    obtenerDetalle();
  }, [plato]);//Se usa hooks? Verificar

  const agregarOEliminarPlato = () => {
    const esVegano = detalle?.vegan;
    const veganos = menu.filter(p => p.vegan).length;
    const noVeganos = menu.filter(p => !p.vegan).length;
  
    const existeEnMenu = menu.find(p => p.id === plato.id);
    if (existeEnMenu) {
      setMenu(menu.filter(p => p.id !== plato.id));
    } else {
      if (menu.length >= 4) {
        Alert.alert("Límite alcanzado", "El menú ya tiene 4 platos.");
        return; ; // No muestra la alerta. Sale la pantalla roja que dice ´Alert´ doesn't exist. Si funciona lo de limitar la maxima cantidad de platos
      }
      if (esVegano && veganos >= 2) {
        Alert.alert("Límite alcanzado", "Solo puedes agregar hasta 2 platos veganos.");
        return;// No muestra la alerta. Sale la pantalla roja que dice ´Alert´ doesn't exist. Si funciona lo de limitar la maxima cantidad de platos
      }
      if (!esVegano && noVeganos >= 2) {
        Alert.alert("Límite alcanzado", "Solo puedes agregar hasta 2 platos no veganos.");
        return;// No muestra la alerta. Sale la pantalla roja que dice ´Alert´ doesn't exist. Si funciona lo de limitar la maxima cantidad de platos
      }
      
      setMenu([...menu, detalle]);
    }
    navigation.goBack();
  };

  if (!detalle) {
    return <Text style={styles.loadingText}>Cargando detalles del plato...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: detalle.image }} style={styles.image} />
      <Text style={styles.title}>{detalle.title}</Text>
      <Text style={styles.infoText}>HealthScore: {detalle.healthScore}</Text>
      <Text style={styles.infoText}>Vegano: {detalle.vegan ? "Sí" : "No"}</Text>
      <Text style={styles.infoText}>Precio: ${detalle.pricePerServing}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={agregarOEliminarPlato}
      >
        <Text style={styles.buttonText}>
          {menu.some(p => p.id === plato.id) ? "Eliminar del menú" : "Agregar al menú"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
