import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.bettalife.cyborgstech.com/api/invoices',
});

export default instance;