import { INewEventState } from ".";
import { newEventTypes } from "../actions/event/events.types";

const initialState: INewEventState = {
    author: {},
    authorId: 0,
    calendarEvents: [{}],
    currentEvent: {},
    description: '',
    endDate: '',
    endTime: '',
    errMessage: '',
    eventLocation: '',
    eventType: '',
    eventVisibility: 2,
    name: '',
    privateEvents: [{}],
    publicEvents: [{}],
    showModal: false,
    showPublic: true,
    startDate: '',
    startTime: '',
    userFriends: [{}],
    userInterests: [{}]
}

export const newEventReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case newEventTypes.SET_PUBLIC_EVENTS:
            return {
                ...state,
                publicEvents: [
                    ...state.publicEvents,
                    action.payload.publicEvents
                ]
            }
        case newEventTypes.SET_PRIVATE_EVENTS:
            return {
                ...state,
                privateEvents: [
                    ...state.privateEvents,
                    action.payload.privateEvents
                ]
            }
        case newEventTypes.SET_USER_INTERESTS:
            return {
                ...state,
                userInterests: action.payload.userInterests
            }
        case newEventTypes.SET_USER_FRIENDS:
            return {
                ...state,
                userFriends: action.payload.userFriends
            }
        case newEventTypes.GET_ERR_MESSAGE:
            return {
                ...state,
                errMessage: action.payload.errMessage
            }
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
        case newEventTypes.UPDATE_SHOW_MODAL:
            return {
                ...state,
                showModal: action.payload.showModal
            }
        case newEventTypes.UPDATE_CURRENT_EVENT:
            return {
                ...state,
                currentEvent: action.payload.event
            }
        case newEventTypes.UPDATE_EVENT_VISIBILITY:
            return {
                ...state,
                eventVisibility: action.payload.eventVisibility
            }
        case newEventTypes.UPDATE_SHOW_PUBLIC:
            return {
                ...state,
                showPublic: action.payload.showPublic
            }
        case newEventTypes.UPDATE_CALENDAR_EVENTS:
            return {
                ...state,
                calendarEvents: action.payload.calendarEvents
            }
        case newEventTypes.UPDATE_EVENT_AUTHOR:
            return {
                ...state,
                author: action.payload.author
            }
    }
    return state;
}