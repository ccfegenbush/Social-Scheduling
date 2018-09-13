import { newUserTypes } from "./new-user.types";

export const updateUsername = (username: string) => {
    return {
        payload: {
            username
        },
        type: newUserTypes.UPDATE_USERNAME
    }
}

export const updatePassword = (password: string) => {
    return {
        payload: {
            password
        },
        type: newUserTypes.UPDATE_PASSWORD
    }
}

export const updateFirstName = (firstName: string) => {
    return {
        payload: {
            firstName
        },
        type: newUserTypes.UPDATE_FIRSTNAME
    }
}

export const updateLastName = (lastName: string) => {
    return {
        payload: {
            lastName
        },
        type: newUserTypes.UPDATE_LASTNAME
    }
}

export const updateAge = (age: number) => {
    return {
        payload: {
            age
        },
        type: newUserTypes.UPDATE_AGE
    }
}

export const updateEmail = (email: string) => {
    return {
        payload: {
            email
        },
        type: newUserTypes.UPDATE_EMAIL
    }
}