import { updateUserInjuries } from "../client-service"

export const exercisesEndpoints = {
    getAll: "/exercises"
}

export const musclesEndpoints = {
    getAll: "/muscles"
}

export const usersEndpoint = {
    getOne: "/users/:username",
    create: "/users"
}

export const injuriesEndpoint = {
    allByUserId: "/injuries/user/:userId"
}

