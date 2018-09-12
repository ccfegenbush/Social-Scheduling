import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";

export interface ISignInState {
  credentials: {
    password: string,
    username: string
  },
  errorMessage: string
}

export interface IState {
  signIn: ISignInState,
}

export const state = combineReducers<IState>({
  signIn: signInReducer,
})