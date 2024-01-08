import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/specialities';

const getSpecialities = async () => {
    const response = await axios.get(baseUrl);
    
    return response.data;
}

export default {
    getSpecialities
}
