import { BASE_API } from "../../config.json";
import axios from 'axios';
import qs from "qs";

export const apiClient = axios.create({
  baseURL: BASE_API,
  paramsSerializer: params =>
    qs.stringify(params, { arrayFormat: "repeat" }), // Ensures no []
});
