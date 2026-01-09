import axios from 'axios'
import {toast} from 'react-toastify'


const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
})

// request interceptor -automatic token injection

axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = token
    }
    return config;
})



// response interceptor - handle 401 error

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) =>{
        if(error.response?.status === 401){
            localStorage.removeItem('token')
            toast.error("Session expried, please login again")
            window.location.href = '/login';
        }
        return Promise.reject(error)
    }
)

export default axiosInstance