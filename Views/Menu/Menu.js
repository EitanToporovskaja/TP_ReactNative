import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useMenu } from '../../Components/MenuItem/MenuItem';
import { fetchPlatos } from '../../api';

const Menu = () => {
  const { menu, setMenu } = useMenu();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const obtenerPlatos = async () => {
      try {
        const platos = await fetchPlatos();
        setMenu(platos);
      } catch (error) {
        console.error("Error al obtener los platos:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerPlatos();
  }, []);

  const eliminarPlato = (platoParaEliminar) => {
    const nuevosPlatos = menu.filter(plato => plato.id !== platoParaEliminar.id);
    setMenu(nuevosPlatos);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú de Platos</Text>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.platoContainer}>
            <Text>{item.nombre}</Text>
            <Button title="Eliminar" onPress={() => eliminarPlato(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  platoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
});

export default Menu;
