import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/medicines';

const getMedicines = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const getMedicineById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
}

const updateMedicine = async (medicine, id) => {
    const response = await axios.put(`${baseUrl}`, medicine);
    return response;
}

export default {
    getMedicines,
    getMedicineById,
    updateMedicine
}