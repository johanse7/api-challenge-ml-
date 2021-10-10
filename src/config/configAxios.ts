import axios, { AxiosInstance } from "axios"
import configEnv from "./configEnv"

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: configEnv.urlBaseApiMl,
})


