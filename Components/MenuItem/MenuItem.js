import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useMenu } from '../../MenuContext';

export default function MenuItem({ plato, navigation }) {
  const { menu, setMenu } = useMenu();

  const eliminarPlato = () => {
    const newMenu = menu.filter(p => p.id !== plato.id);
    setMenu(newMenu);
  };

  return (
    <View>
      <Text>{plato.title}</Text>
      <Image source={{ uri: plato.image }} style={{ width: 100, height: 100 }} />
      <Button title="Ver Detalle" onPress={() => navigation.navigate('DetallePlato', { plato })} />
      <Button title="Eliminar" onPress={eliminarPlato} />
    </View>
  );
}
