import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import api from '../../api';

export default function DetallePlato({ route, navigation }) {
  const { plato, menu, setMenu } = route.params;
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
  }, [plato]);

  const agregarOEliminarPlato = () => {
    const existeEnMenu = menu.find(p => p.id === plato.id);
    if (existeEnMenu) {
      setMenu(menu.filter(p => p.id !== plato.id)); // Eliminar si ya está en el menú
    } else if (menu.length < 4) {
      setMenu([...menu, plato]); // Agregar si no está y no excede el límite
    } else {
      alert("El menú ya tiene 4 platos.");
    }
    navigation.goBack();
  };

  if (!detalle) {
    return <Text>Cargando detalles del plato...</Text>;
  }

  return (
    <View>
      <Text>Nombre: {detalle.title}</Text>
      <Text>HealthScore: {detalle.healthScore}</Text>
      <Text>Vegano: {detalle.vegan ? "Sí" : "No"}</Text>
      <Button
        title={menu.some(p => p.id === plato.id) ? "Eliminar del menú" : "Agregar al menú"}
        onPress={agregarOEliminarPlato}
      />
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}
