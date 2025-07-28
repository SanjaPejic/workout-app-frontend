import {exercisesEndpoints, injuriesEndpoint, musclesEndpoints, usersEndpoint, workoutsEndpoint} from "./constants/endpoints";
import { apiClient } from "./api-client";
import type { Workout } from "@/types/Workout";

export const getExercises = async (pageNumber: number, pageSize: number, searchTerm: string, targetMuscNames: string[]) => {
  const endpoint = exercisesEndpoints.getAll;
  const response = await apiClient.get(endpoint, {
    params: { page: pageNumber, size: pageSize, searchTerm, targetMuscles: targetMuscNames},
  });
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

export const getWorkouts = async (userId: number) => {
  const endpoint = workoutsEndpoint.allByUserId.replace(":userId", `${userId}`);
  const response = await apiClient.get(endpoint);
  return response.data;
}

export const deleteWorkout = async (workoutId: number) => {
  const endpoint = workoutsEndpoint.deleteOne.replace(":workoutId", `${workoutId}`);
  const response = await apiClient.delete(endpoint);
  return response.data;
}

export const createWorkout = async (workoutForSaving: Workout) => {
  const endpoint = workoutsEndpoint.create;
  const response = await apiClient.post(endpoint, workoutForSaving);
  return response.data;
}

export const updateWorkout = async (workout: Workout) => {
  const endpoint = workoutsEndpoint.update;
  const response = await apiClient.put(endpoint, workout);
  return response.data;
}
