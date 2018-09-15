import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as newEventActions from '../../actions/event/events.actions';
import { environment } from '../../environment';
import { INewEventState, IState } from '../../reducers';

interface IProps extends RouteComponentProps<{}>, INewEventState {
    updateEventName: (eventName: string) => any,
    updateEventType: (eventType: string) => any,
    updateEventDescription: (eventDescription: string) => any,
    updateEventStartDate: (eventStartDate: string) => any,
    updateEventEndDate: (eventEndDate: string) => any,
    updateEventStartTime: (updateEventStartTime: string) => any,
    updateEventEndTime: (eventEventEndTime: string) => any,
    updateEventLocation: (location: string) => any,
    updateAuthorId: (authorId: number) => any,
    onSubmit: (user: any) => any
}

class NewEventComponent extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public eventNameChange = (e: any) => {
        this.props.updateEventName(e.target.value);
    }

    public eventTypeChange = (e: any) => {
        this.props.updateEventType(e.target.value);
    }

    public eventDescriptionChange = (e: any) => {
        this.props.updateEventDescription(e.target.value);
    }

    public eventStartDateChange = (e: any) => {
        this.props.updateEventStartDate(e.target.value);
    }

    public eventEndDateChange = (e: any) => {
        this.props.updateEventEndDate(e.target.value);
    }

    public eventStartTimeChange = (e: any) => {
        this.props.updateEventStartTime(e.target.value);
    }

    public eventEndTimeChange = (e: any) => {
        this.props.updateEventEndTime(e.target.value);
    }

    public eventLocationChange = (e: any) => {
        this.props.updateEventLocation(e.target.value);
    }

    public authorIdChange = (e: any) => {
        this.props.updateAuthorId(e.target.value);
    }

    public onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const ev = this.props;
        e.preventDefault();
        const event = {
            "authorId": JSON.parse(localStorage.getItem('userId') || '{}'),
            "description": ev.description,
            "endDate": ev.endDate,
            "endTime": ev.endTime,
            "eventType": ev.eventType,
            "location": ev.eventLocation,
            "name": ev.name,
            "startDate": ev.startDate,
            "startTime": ev.startTime,
        }

        console.log(event)
        fetch(environment.context + "events/create", {
            body: JSON.stringify(event),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(resp => resp.json())
            .then(userData => {
                this.props.history.push('/home');
            })
            .catch(err => {
                console.log(err);
            })
    }

    public render() {
        const u = this.props;
        return (
            <div className="mt-5 pt-5 container">
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Create a New Event</h1>

                    <label htmlFor="inputName" className="sr-only">Name</label>
                    <input
                        onChange={this.eventNameChange}
                        value={u.name}
                        type="text"
                        name="event name"
                        className="form-control"
                        placeholder="Event Name"
                        required />

                    <label htmlFor="inputType" className="sr-only">Event type</label>
                    <input
                        onChange={this.eventTypeChange}
                        value={u.eventType}
                        type="text"
                        name="event Type"
                        className="form-control"
                        placeholder="Event Type"
                        required />

                    <label htmlFor="inputDescription" className="sr-only">Description</label>
                    <input
                        onChange={this.eventDescriptionChange}
                        value={u.description}
                        type="text"
                        name="description"
                        className="form-control"
                        placeholder="Description"
                        required />

                    <label htmlFor="inputStartDate" className="sr-only">Start Date</label>
                    <input
                        onChange={this.eventStartDateChange}
                        value={u.startDate}
                        type="text"
                        name="startDate"
                        className="form-control"
                        placeholder="Start Date"
                        required />

                    <label htmlFor="inputEndDate" className="sr-only">End Date</label>
                    <input
                        onChange={this.eventEndDateChange}
                        value={u.endDate}
                        type="text"
                        name="endDate"
                        className="form-control"
                        placeholder="End Date"
                        required />

                    <label htmlFor="inputStartTime" className="sr-only">Start time</label>
                    <input
                        onChange={this.eventStartTimeChange}
                        value={u.startTime}
                        type="text"
                        name="start time"
                        className="form-control"
                        placeholder="Start Time"
                        required />

                    <label htmlFor="inputEndTime" className="sr-only">End time</label>
                    <input
                        onChange={this.eventEndTimeChange}
                        value={u.endTime}
                        type="text"
                        name="end time"
                        className="form-control"
                        placeholder="End Time"
                        required />

                    <label htmlFor="inputLocation" className="sr-only">Location</label>
                    <input
                        onChange={this.eventLocationChange}
                        value={u.eventLocation}
                        type="text"
                        name="location"
                        className="form-control"
                        placeholder="Location"
                        required />

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>

            </div>
        )
    }
}

const mapStateToProps = (state: IState) => (state.newEvent);
const mapDispatchToProps = {
    updateAuthorId: newEventActions.updateAuthorId,
    updateEventDescription: newEventActions.updateEventDescription,
    updateEventEndDate: newEventActions.updateEventEndDate,
    updateEventEndTime: newEventActions.updateEventEndTime,
    updateEventLocation: newEventActions.updateEventLocation,
    updateEventName: newEventActions.updateEventName,
    updateEventStartDate: newEventActions.updateEventStartDate,
    updateEventStartTime: newEventActions.updateEventStartTime,
    updateEventType: newEventActions.updateEventType,
   
}
export default connect(mapStateToProps, mapDispatchToProps)(NewEventComponent);