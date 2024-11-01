import axios from 'axios';

const apiKey = 'TU_API_KEY';
const api = axios.create({
  baseURL: 'https://api.spoonacular.com/recipes/complexSearch',
  params: {
    apiKey: apiKey
  }
});

export default api;
