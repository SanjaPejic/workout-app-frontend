import {exercisesEndpoints, musclesEndpoints} from "./constants/endpoints";
import { apiClient } from "./api-client";

export const getExercises = async () => {
  const response = await apiClient.get(exercisesEndpoints.getAll);
  return response.data;
};

export const getMuscles = async () => {
  const response = await apiClient.get(musclesEndpoints.getAll);
  return response.data;
}