import { IUserInterestsState } from ".";
import { userInterestsTypes } from "../actions/user-interests/user-interests.types";

const initialState: IUserInterestsState = {
    interest: ''
}

export const userInterestsReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case userInterestsTypes.UPDATE_INTEREST:
            return {
                ...state,
                interest: action.payload.interest
            }
    }

    return state;
}