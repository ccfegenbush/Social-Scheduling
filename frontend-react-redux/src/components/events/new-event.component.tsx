import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import * as newEventActions from "../../actions/event/events.actions";
import { environment } from "../../environment";
import { INewEventState, IState } from "../../reducers";

interface IProps extends RouteComponentProps<{}>, INewEventState {
  updateEventName: (eventName: string) => any;
  updateEventType: (eventType: string) => any;
  updateEventDescription: (eventDescription: string) => any;
  updateEventStartDate: (eventStartDate: string) => any;
  updateEventEndDate: (eventEndDate: string) => any;
  updateEventStartTime: (updateEventStartTime: string) => any;
  updateEventEndTime: (eventEventEndTime: string) => any;
  updateEventLocation: (location: string) => any;
  updateAuthorId: (authorId: number) => any;
  onSubmit: (user: any) => any;
}

class NewEventComponent extends React.Component<IProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public eventNameChange = (e: any) => {
    this.props.updateEventName(e.target.value);
  };

  public eventTypeChange = (e: any) => {
    this.props.updateEventType(e.target.value);
  };

  public eventDescriptionChange = (e: any) => {
    this.props.updateEventDescription(e.target.value);
  };

  public eventStartDateChange = (e: any) => {
    this.props.updateEventStartDate(e.target.value);
  };

  public eventEndDateChange = (e: any) => {
    this.props.updateEventEndDate(e.target.value);
  };

  public eventStartTimeChange = (e: any) => {
    this.props.updateEventStartTime(e.target.value);
  };

  public eventEndTimeChange = (e: any) => {
    this.props.updateEventEndTime(e.target.value);
  };

  public eventLocationChange = (e: any) => {
    this.props.updateEventLocation(e.target.value);
  };

  public authorIdChange = (e: any) => {
    this.props.updateAuthorId(e.target.value);
  };

  public onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const ev = this.props;
    e.preventDefault();
    const event = {
      authorId: JSON.parse(localStorage.getItem("userId") || "{}"),
      description: ev.description,
      endDate: ev.endTime,
      endTime: ev.endTime,
      eventType: ev.eventType,
      location: ev.eventLocation,
      name: ev.name,
      startDate: ev.startTime,
      startTime: ev.startTime
    };

    console.log(event);
    fetch(environment.context + "events/create", {
      body: JSON.stringify(event),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .then(resp => resp.json())
      .then(userData => {
        this.props.history.push("/calendar");
      })
      .catch(err => {
        console.log(err);
      });
  };

  public render() {
    const u = this.props;
    return (
      <div>
        <section className="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">New Event</h2>
                <h3 className="section-subheading text-muted" >{u.startDate} - {u.endDate}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <form className="form-signin" onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <p className="help-block text-dark">Event Name *:</p>
                        <input
                          onChange={this.eventNameChange}
                          value={u.name}
                          type="text"
                          name="event name"
                          className="form-control"
                          placeholder="Event Name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <p className="help-block text-dark">Event Type *:</p>
                        <input
                          onChange={this.eventTypeChange}
                          value={u.eventType}
                          type="text"
                          name="event Type"
                          className="form-control"
                          placeholder="Event Type"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <p className="help-block text-dark">
                          Event Description *:
                        </p>
                        <input
                          onChange={this.eventDescriptionChange}
                          value={u.description}
                          type="text"
                          name="description"
                          className="form-control"
                          placeholder="Description"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <p className="help-block text-dark">
                          Event Start Date/Time (test format: 2015-03-25T12:00:00Z)*:
                        </p>

                        <input
                          onChange={this.eventStartTimeChange}
                          value={u.startTime}
                          type="text"
                          name="start time"
                          className="form-control"
                          placeholder="Start Time"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <p className="help-block text-dark">Event End Date/Time  (test format: 2015-03-25T12:00:00Z)*:</p>

                        <input
                          onChange={this.eventEndTimeChange}
                          value={u.endTime}
                          type="text"
                          name="end time"
                          className="form-control"
                          placeholder="End Time"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <p className="help-block text-dark">Event Location *:</p>
                        <input
                          onChange={this.eventLocationChange}
                          value={u.eventLocation}
                          type="text"
                          name="location"
                          className="form-control"
                          placeholder="Location"
                          required
                        />
                      </div>
                    </div>
                    <div className="clearfix" />

                    <div className="col-lg-12 text-center">
                      <button
                        className="btn btn-primary btn-xl text-uppercase px-5 mt-2"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => state.newEvent;
const mapDispatchToProps = {
  updateAuthorId: newEventActions.updateAuthorId,
  updateEventDescription: newEventActions.updateEventDescription,
  updateEventEndDate: newEventActions.updateEventEndDate,
  updateEventEndTime: newEventActions.updateEventEndTime,
  updateEventLocation: newEventActions.updateEventLocation,
  updateEventName: newEventActions.updateEventName,
  updateEventStartDate: newEventActions.updateEventStartDate,
  updateEventStartTime: newEventActions.updateEventStartTime,
  updateEventType: newEventActions.updateEventType
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewEventComponent);
