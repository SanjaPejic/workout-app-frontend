import { BASE_API } from "../../config.json";
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: BASE_API
});