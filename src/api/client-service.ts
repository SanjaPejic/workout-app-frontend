import {exercisesEndpoints, injuriesEndpoint, musclesEndpoints, usersEndpoint} from "./constants/endpoints";
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

export const getUserInjuries = async (userId: number) => {
  const endpoint = injuriesEndpoint.allByUserId.replace(":userId", `${userId}`);
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const updateUserInjuries = async (userId: number, injuries: { muscle: { id: number; name: string } }[]) => {
  const endpoint = injuriesEndpoint.allByUserId.replace(":userId", `${userId}`);
  const response = await apiClient.put(endpoint, injuries);
  return response.data;
};
