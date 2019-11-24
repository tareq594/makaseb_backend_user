import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.bettalife.cyborgstech.com/api/',
});
export default instance;