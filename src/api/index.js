import axios from "axios"

const apiClient = axios.create({
    baseURL:'http://localhost:2004',
    timeout : 6000,
    headers:{
        "Content-Type":"application/json"
    }
})


export default apiClient;