import axios from 'axios';

const Axios = axios.create({
    baseURL: '/api/',
    timeout: 50000
})

export default Axios;