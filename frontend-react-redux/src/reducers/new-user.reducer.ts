import { newUserTypes } from "../actions/new-user/new-user.types";
import { INewUserState } from ".";

const initialState: INewUserState = {
    age: 0,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    username: ''
}

export const newUserReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case newUserTypes.UPDATE_USERNAME:
            return {
                ...state,
                username: action.payload.username
            }
        case newUserTypes.UPDATE_PASSWORD:
            return {
                ...state,
                password: action.payload.password
            }
        case newUserTypes.UPDATE_FIRSTNAME:
            return {
                ...state,
                firstName: action.payload.firstName
            }
        case newUserTypes.UPDATE_LASTNAME:
            return {
                ...state,
                lastName: action.payload.lastName
            }
        case newUserTypes.UPDATE_AGE:
            return {
                ...state,
                age: action.payload.age
            }
        case newUserTypes.UPDATE_EMAIL:
            return {
                ...state,
                email: action.payload.email
            }
    }

    return state;
}