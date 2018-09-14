import { userInterestsTypes } from "./user-interests.types";

export const updateInterest = (interest: string) => {
    return {
        payload: {
            interest
        },
        type: userInterestsTypes.UPDATE_INTEREST
    }
}