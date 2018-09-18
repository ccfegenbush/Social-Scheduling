import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { newUserReducer } from "./new-user.reducer";
import { newEventReducer } from "./new-event.reducer";

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

export interface INewEventState {
  authorId: number,
  description: string,
  endDate: string,
  endTime: string,
  eventLocation: string,
  name: string,
  startDate: string,
  startTime: string, 
  eventType: string
}

export interface IState {
  newEvent: INewEventState,
  newUser: INewUserState,
  signIn: ISignInState
}

export const state = combineReducers<IState>({
  newEvent: newEventReducer,
  newUser: newUserReducer,
  signIn: signInReducer
})