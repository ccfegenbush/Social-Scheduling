import { newEventTypes } from "./events.types";

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