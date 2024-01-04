import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/prescription';

const getPrescriptionById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
}

const createPrescription = async (prescription) => {
    const response = await axios.post(baseUrl, prescription);
    return response.data;
}

export default { getPrescriptionById,
    createPrescription
}