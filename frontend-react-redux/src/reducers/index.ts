import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { newUserReducer } from "./new-user.reducer";

export interface ISignInState {
  credentials: {
    password: string,
    username: string
  },
  errorMessage: string
}

export interface INewUserState {
  age: number,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  username: string
}

export interface IState {
  newUser: INewUserState,
  signIn: ISignInState 
}

export const state = combineReducers<IState>({
  newUser: newUserReducer,
  signIn: signInReducer
})