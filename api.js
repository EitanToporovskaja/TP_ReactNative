import axios from 'axios';

const apiKey = 'b8fb36ba01a5416c8d83a6e42170b278';
const api = axios.create({
  baseURL: 'https://api.spoonacular.com/recipes/complexSearch',
  params: {
    apiKey: apiKey
  }
});

export default api;
