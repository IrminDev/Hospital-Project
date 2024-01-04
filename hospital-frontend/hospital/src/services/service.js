import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/services';

const getServices = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

export default {
    getServices
}