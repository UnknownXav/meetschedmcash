import axios from "axios";

const URL_PROD = "https://meetschedmcash-1r26.vercel.app/api/";
const LOCAL = "http://localhost:3000/api/"


export const axiosConfig = axios.create({
  baseURL: URL_PROD,
})