import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/patient';

const getPatientById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
}

const getPatients = async () => {
    const response = await axios.get(`${baseUrl}s`);

    return response.data;
}

const deletePatient = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response;
}

export default { getPatientById, getPatients, deletePatient }