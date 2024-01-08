import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/purchase';

const getPurchaseByUser = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    
    return response.data;
}

const getPurchases = async () => {
    const response = await axios.get(`${baseUrl}s`);
    return response.data;
}

const createPurchase = async (purchase) => {
    const response = await axios.post(baseUrl, purchase);

    return response;
}

export default { getPurchaseByUser,
    createPurchase,
    getPurchases,
}