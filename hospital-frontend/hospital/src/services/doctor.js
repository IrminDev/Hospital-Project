import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/doctor';

const getDoctorsByAppointmentType = async (id) => { 
    const response = await axios.get(`${baseUrl}/appointmentTypes/${id}`)
    return response.data
}

const getDoctor = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const getDoctors = async () => {
    const response = await axios.get(`${baseUrl}s`)
    return response.data
}

const deleteDoctor = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)

    return response
}

export default { getDoctorsByAppointmentType, getDoctor,getDoctors, deleteDoctor }