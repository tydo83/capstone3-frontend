import axios from 'axios';

const Axios = axios.create({
    baseURL: process.env.REACT_APP_AXIOS,
    timeout: 50000
})

export default Axios;