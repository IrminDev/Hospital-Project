import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/appointment';

const getAppointmentById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
}

const getAppointmentsForUser = async (id) => {
    const response = await axios.get(`${baseUrl}s/${id}`);
    return response.data;
}

const getAppointmentTypes = async (id) => {
    const response = await axios.get(`${baseUrl}Types/`);
    return response.data;
}

const getAppointmentsBySchedule = async (id, day) => {
    const response = await axios.get(`${baseUrl}s/${id}/${day}`)
    return response.data;
}

export default { getAppointmentById, getAppointmentsForUser, getAppointmentTypes, getAppointmentsBySchedule }