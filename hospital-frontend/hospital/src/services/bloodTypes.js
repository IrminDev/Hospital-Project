import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/bloodType';

const getBloodTypes = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

export default { getBloodTypes }