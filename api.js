//Solo aca estamos usando axios
import axios from 'axios';

const apiKey = '65a856846d2d4aacb809f18fe5155fbe';
const api = axios.create({
  baseURL: 'https://api.spoonacular.com',
  params: {
    apiKey: apiKey
  }
});

export default api;
