import axios from "axios";

const baseUrl = 'http://localhost:3001/orders'

const createOrder = async (content) => {
    const response = await axios.post(baseUrl, content)
    return response.data
}

const apiObj = { createOrder }

export default apiObj