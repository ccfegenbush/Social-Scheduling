import { INewEventState } from ".";
import { newEventTypes } from "../actions/event/events.types";

const initialState: INewEventState = {
    authorId: 0,
    description: '',
    endDate: '',
    endTime: '',
    eventLocation: '',
    eventType: '',
    name: '',
    startDate: '',
    startTime: ''
}

export const newEventReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case newEventTypes.UPDATE_AUTHOR_ID:
            return {
                ...state,
                authorId: action.payload.authorId
            }
        case newEventTypes.UPDATE_EVENT_DESCRIPTION:
            return {
                ...state,
                description: action.payload.description
            }
        case newEventTypes.UPDATE_EVENT_END_DATE:
            return {
                ...state,
                endDate: action.payload.endDate
            }
        case newEventTypes.UPDATE_EVENT_END_TIME:
            return {
                ...state,
                endTime: action.payload.endTime
            }
        case newEventTypes.UPDATE_EVENT_NAME:
            return {
                ...state,
                name: action.payload.name
            }
        case newEventTypes.UPDATE_EVENT_START_DATE:
            return {
                ...state,
                startDate: action.payload.startDate
            }
        case newEventTypes.UPDATE_EVENT_START_TIME:
            return {
                ...state,
                startTime: action.payload.startTime
            }
        case newEventTypes.UPDATE_EVENT_TYPE:
            return {
                ...state,
                eventType: action.payload.eventType
            }
        case newEventTypes.UPDATE_EVENT_LOCATION:
            return {
                ...state,
                eventLocation: action.payload.eventLocation
            }
    }
    return state;
}