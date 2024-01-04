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

const getAppointmentsBySchedule = async (idPatient, idDoctor, day) => {
    const response = await axios.get(`${baseUrl}s/${idPatient}/${idDoctor}/${day}`)
    return response.data;
}

const createAppointment = async (appointment) => {
    const response = await axios.post(baseUrl, appointment);
    return response.data;
}

const getCompletedAppointments = async (idDoctor) => {
    const response = await axios.get(`${baseUrl}s/completed/${idDoctor}`);

    return response.data;
}

export default { getAppointmentById,
    getAppointmentsForUser,
    getAppointmentTypes,
    getAppointmentsBySchedule,
    createAppointment,
    getCompletedAppointments
}