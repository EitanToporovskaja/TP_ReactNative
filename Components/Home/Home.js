import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';

export default function Home({ navigation }) {
  const [menu, setMenu] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [promedioHealthScore, setPromedioHealthScore] = useState(0);

  useEffect(() => {
    // Recalcula el precio total y el promedio de HealthScore cuando cambia el menú
    setPrecioTotal(menu.reduce((acc, plato) => acc + (plato.price || 0), 0));
    setPromedioHealthScore(
      menu.length ? menu.reduce((acc, plato) => acc + (plato.healthScore || 0), 0) / menu.length : 0
    );
  }, [menu]);

  const eliminarPlato = (id) => setMenu(menu.filter(plato => plato.id !== id));

  return (
    <View>
      <Text>Precio Total: {precioTotal}</Text>
      <Text>Promedio HealthScore: {promedioHealthScore.toFixed(2)}</Text>

      <Button title="Buscar Plato" onPress={() => navigation.navigate('BuscarPlato', { setMenu, menu })} />

      <FlatList
        data={menu}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Button 
              title="Detalle" 
              onPress={() => navigation.navigate('DetallePlato', { plato: item, menu, setMenu })} 
            />
            <Button title="Eliminar" onPress={() => eliminarPlato(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
