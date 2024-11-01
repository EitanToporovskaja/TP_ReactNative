import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Button } from 'react-native';
import api from '../../api';
import { useMenu } from '../../MenuContext';

export default function BuscarPlato({ navigation }) {
  const { setMenu, menu } = useMenu(); // Accede al menú desde el contexto
  const [search, setSearch] = useState('');
  const [resultados, setResultados] = useState([]);

  const buscarPlatos = async () => {
    if (search.length > 2) {
      const response = await api.get('', { params: { query: search } });
      setResultados(response.data.results);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Buscar plato"
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={buscarPlatos}
      />
      <FlatList
        data={resultados}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Button 
              title="Detalle" 
              onPress={() => navigation.navigate('DetallePlato', { plato: item })} 
            />
          </View>
        )}
      />
    </View>
  );
}