import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.openweathermap.org"
});
export default instance;