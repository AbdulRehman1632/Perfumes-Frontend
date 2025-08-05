import axios from "axios"

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout : 15000,
    headers:{
        "Content-Type":"application/json"
    }
})

console.log("Base URL:", import.meta.env.VITE_BASE_URL);



export default apiClient;