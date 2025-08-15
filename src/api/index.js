import axios from "axios"

const apiClient = axios.create({
    baseURL: ["https://perfumes-backend.vercel.app/", "http://localhost:2004"],
    timeout : 15000,
    headers:{
        "Content-Type":"application/json"
    }
})


export default apiClient;