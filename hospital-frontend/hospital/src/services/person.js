import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/persons';

const getPersonById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
}

const deletePerson = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
}

const changeName = async (id, name) => {
    const response = await axios.put(`${baseUrl}/${id}`, {name});
    return response.data;
}

export default { getPersonById, deletePerson, changeName }