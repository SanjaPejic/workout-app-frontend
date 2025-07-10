import {exercisesEndpoints, musclesEndpoints, usersEndpoint} from "./constants/endpoints";
import { apiClient } from "./api-client";

export const getExercises = async () => {
  const endpoint = exercisesEndpoints.getAll;
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const getMuscles = async () => {
  const endpoint = musclesEndpoints.getAll
  const response = await apiClient.get(endpoint);
  return response.data;
}

export const getUser = async (username: string) => {
  const endpoint = usersEndpoint.getOne.replace(":username", username );
  const response = await apiClient.get(endpoint);
  return response.data;
}

export const createUser = async (username: string) => {
  const endpoint = usersEndpoint.create;
  const response = await apiClient.post(endpoint, {username});
  return response.data;
}