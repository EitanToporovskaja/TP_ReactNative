import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useMenu } from '../../MenuContext';

export default function DetallePlato({ route, navigation }) {
  const { plato } = route.params;
  const { menu, agregarOEliminarPlato, obtenerDetalle } = useMenu();
  const [detalle, setDetalle] = useState([]);

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        const resultado = await obtenerDetalle(plato);
        setDetalle(resultado);
      } catch (error) {
        console.error("Error al obtener el detalle del plato:", error);
      }
    };

    cargarDetalle();
  }, [plato]);

  if (!detalle) {
    return <Text style={styles.loadingText}>Cargando detalles del plato...</Text>;
  }


  return (
    <View style={styles.container}>
      <ScrollView scrollContentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: detalle.image }} style={styles.image} />
        <Text style={styles.title}>{detalle.title}</Text>
        <Text style={styles.infoText}>HealthScore: {detalle.healthScore}</Text>
        <Text style={styles.infoText}>Vegano: {detalle.vegan ? "Sí" : "No"}</Text>
        <Text style={styles.infoText}>Precio: ${detalle.pricePerServing}</Text>
        <Text style={styles.resumen}>Resumen: {detalle.summary?.replace(/<[^>]*>/g, '') || 'Sin descripción'}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            try {
              agregarOEliminarPlato(detalle); 
            } catch (error) {
              console.error("Error agregando o eliminando el plato:", error);
            }
          }}
        >
          <Text style={styles.buttonText}>
            {menu.some(p => p.id === plato.id) ? "Eliminar del menú" : "Agregar al menú"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

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
  },resumen:{
fontSize:18,
  },
  scrollContent: {
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
    alignSelf:'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
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