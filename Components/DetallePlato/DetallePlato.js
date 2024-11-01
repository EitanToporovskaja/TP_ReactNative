import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useMenu } from '../MenuItem/MenuItem';
import api from '../../api';

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
  }, [plato]);

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
        return;
      }
      if (esVegano && veganos >= 2) {
        Alert.alert("Límite alcanzado", "Solo puedes agregar hasta 2 platos veganos.");
        return;
      }
      if (!esVegano && noVeganos >= 2) {
        Alert.alert("Límite alcanzado", "Solo puedes agregar hasta 2 platos no veganos.");
        return;
      }
      setMenu([...menu, detalle]);
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
      <Image source={{ uri: detalle.image }} style={{ width: 100, height: 100 }} />
      <Button
        title={menu.some(p => p.id === plato.id) ? "Eliminar del menú" : "Agregar al menú"}
        onPress={agregarOEliminarPlato}
      />
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}