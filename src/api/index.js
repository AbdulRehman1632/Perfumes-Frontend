import axios from "axios"

const apiClient = axios.create({
    baseURL:     import.meta.env.MODE === "development"
      ? "http://localhost:2004"
      : "https://perfumes-backend.vercel.app/",

    timeout : 15000,
    headers:{
        "Content-Type":"application/json"
    }
})


export default apiClient;