import { newEventTypes } from "./events.types";


export const getErrMessage = (errMessage: string) => {
    return {
        payload: {
            errMessage
        },
        type: newEventTypes.GET_ERR_MESSAGE
    }
}

export const setPublicEvents = (publicEvents: object) => {
    return {
        payload: {
            publicEvents
        },
        type: newEventTypes.SET_PUBLIC_EVENTS
    }
}

export const setPrivateEvents = (privateEvents: object) => {
    return {
        payload: {
            privateEvents
        },
        type: newEventTypes.SET_PRIVATE_EVENTS
    }
}

export const setUserInterests = (userInterests: object[]) => {
    return {
        payload: {
            userInterests
        },
        type: newEventTypes.SET_USER_INTERESTS
    }
}

export const setUserFriends = (userFriends: object[]) => {
    return {
        payload: {
            userFriends
        },
        type: newEventTypes.SET_USER_FRIENDS
    }
}

export const updateEventName = (name: string) => {
    return {
        payload: {
            name
        },
        type: newEventTypes.UPDATE_EVENT_NAME
    }
}

export const updateEventType = (eventType: string) => {
    return {
        payload: {
            eventType
        },
        type: newEventTypes.UPDATE_EVENT_TYPE
    }
}

export const updateEventDescription = (description: string) => {
    return {
        payload: {
            description
        },
        type: newEventTypes.UPDATE_EVENT_DESCRIPTION
    }
}

export const updateEventStartDate = (startDate: string) => {
    return {
        payload: {
            startDate
        },
        type: newEventTypes.UPDATE_EVENT_START_DATE
    }
}

export const updateEventEndDate = (endDate: number) => {
    return {
        payload: {
            endDate
        },
        type: newEventTypes.UPDATE_EVENT_END_DATE
    }
}

export const updateEventStartTime = (startTime: string) => {
    return {
        payload: {
            startTime
        },
        type: newEventTypes.UPDATE_EVENT_START_TIME
    }
}
export const updateEventEndTime = (endTime: string) => {
    return {
        payload: {
            endTime
        },
        type: newEventTypes.UPDATE_EVENT_END_TIME
    }
}
export const updateEventLocation = (eventLocation: string) => {
    return {
        payload: {
            eventLocation
        },
        type: newEventTypes.UPDATE_EVENT_LOCATION
    }
}
export const updateAuthorId = (authorId: number) => {
    return {
        payload: {
            authorId
        },
        type: newEventTypes.UPDATE_AUTHOR_ID
    }
}
export const updateShowModal = (showModal: boolean) => {
    return {
        payload: {
            showModal
        },
        type: newEventTypes.UPDATE_SHOW_MODAL
    }
}
export const updateCurrentEvent = (event: object) => {
    return {
        payload: {
            event
        },
        type: newEventTypes.UPDATE_CURRENT_EVENT
    }
}
export const updateEventVisibility = (eventVisibility: number) => {
    return {
        payload: {
            eventVisibility
        },
        type: newEventTypes.UPDATE_EVENT_VISIBILITY
    }
}
export const updateShowPublic = (showPublic: boolean) => {
    return {
        payload: {
            showPublic
        },
        type: newEventTypes.UPDATE_SHOW_PUBLIC
    }
}
export const updateCalendarEvents = (calendarEvents: object[]) => {
    return {
        payload: {
            calendarEvents
        },
        type: newEventTypes.UPDATE_CALENDAR_EVENTS
    }
}
export const updateEventAuthor = (author: object) => {
    return {
        payload: {
            author
        },
        type: newEventTypes.UPDATE_EVENT_AUTHOR
    }
}
