import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/doctors';

const getDoctorsByAppointmentType = async (id) => { 
    const response = await axios.get(`${baseUrl}/appointmentTypes/${id}`)
    return response.data
}

const getDoctor = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export default { getDoctorsByAppointmentType, getDoctor }