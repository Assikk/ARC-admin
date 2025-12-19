import axios from "axios";


const instance = axios.create({
  baseURL: 'http://tjk-scrumtest01:8080/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})




export default instance