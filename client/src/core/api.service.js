import axios from "axios";
const baseURL = "http://localhost:8081";

export var httpClient = axios.create({
    baseURL: baseURL
})

const ApiService = {
    get(path) {
        return httpClient.get(path, {
            headers: {
                "x-access-token": localStorage.getItem('accessToken')
            }
        })
            .catch((error) => { return error })
    },
    post(path, body) {
        return httpClient.post(path, body, {
            headers: {
                "x-access-token": localStorage.getItem('accessToken')
            }
        })
            .catch((error) => { return error })
    }
}

export default ApiService
