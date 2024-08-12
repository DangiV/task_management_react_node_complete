import axios from 'axios'

export const MakeRequest = async (method, url, body) => {

    const UserToken = JSON.parse(localStorage.getItem("userToken"));

    let baseUrl = "http://localhost:3020"
    var config = {
        method: method,
        url: baseUrl + url,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${UserToken}`,
        }
    }

    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        throw error;
    }
}