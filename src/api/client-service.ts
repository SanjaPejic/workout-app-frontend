import {api} from "../constants/api";
import { apiClient } from "./api-client";

export const getExercises = async () => {
  const response = await apiClient.get(api.getExercises);
  return response.data;
};