import axios from "axios";


const instance = axios.create({
  baseURL: 'http://172.28.198.47:8080/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})




export default instance