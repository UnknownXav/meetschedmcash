import axios from "axios"

export const axiosConfig = axios.create({
  baseURL: "https://meetschedmcash-1r26.vercel.app/api/",
})