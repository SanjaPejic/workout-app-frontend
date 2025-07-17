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

export const workoutsEndpoint = {
    allByUserId: "/workouts/user/:userId",
    deleteOne: "/workouts/:workoutId",
    create: "/workouts"
}
