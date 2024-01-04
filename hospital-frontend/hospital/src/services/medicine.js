import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/medicines';

const getMedicines = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

export default {
    getMedicines
}