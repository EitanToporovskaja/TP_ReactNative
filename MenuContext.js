import React, { createContext, useContext, useState } from 'react';
import {Alert} from 'react-native'
import api from './api'
const MenuContext = createContext();

export const useMenu = () => {
  return useContext(MenuContext);
};

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const obtenerDetalle = async (plato) => {
    try {
      const response = await api.get(`/recipes/${plato.id}/information`);
      console.log(response.data)
      return (response.data);
    } catch (error) {
      console.error("Error al obtener el detalle del plato:", error);
    }
  };
  const agregarOEliminarPlato = (plato) => {
    const esVegano = plato?.vegan;
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
      
      setMenu([...menu, plato]);
    }

  };
  return (
    <MenuContext.Provider value={{ menu, setMenu, agregarOEliminarPlato, obtenerDetalle}}>
      {children}
    </MenuContext.Provider>
  );
};
