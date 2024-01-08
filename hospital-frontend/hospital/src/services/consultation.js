import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/consultation';

const getConsultationById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    
    return response.data;
}

const getConsultationsForUser = async (id) => {
    const response = await axios.get(`${baseUrl}s/${id}`);
    return response.data;
}

const createConsultation = async (appointment) => {
    const response = await axios.post(baseUrl, appointment);
    return response.data;
}

export default { getConsultationById,
    getConsultationsForUser,
    createConsultation,
}