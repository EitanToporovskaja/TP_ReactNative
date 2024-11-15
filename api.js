//Solo aca estamos usando axios
import axios from 'axios';

const apiKey = '65a2841c2233431ea4435b000de24b1c';
const api = axios.create({
  baseURL: 'https://api.spoonacular.com',
  params: {
    apiKey: apiKey
  }
});

export default api;
