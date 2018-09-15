import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { newUserReducer } from "./new-user.reducer";
import { userInterestsReducer } from "./user-interests.reducer";

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

export interface IUserInterestsState {
  interest: string
}

export interface IState {
  newUser: INewUserState,
  signIn: ISignInState,
  userInterests: IUserInterestsState
}

export const state = combineReducers<IState>({
  newUser: newUserReducer,
  signIn: signInReducer,
  userInterests: userInterestsReducer
})