import axios from "axios";

const baseUrl = 'http://localhost:3001/meals'

const getMeals = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const apiObj = { getMeals }

export default apiObj