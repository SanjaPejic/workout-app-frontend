import {exercisesEndpoints} from "./constants/endpoints";
import { apiClient } from "./api-client";

export const getExercises = async () => {
  const response = await apiClient.get(exercisesEndpoints.getAll);
  return response.data;
};