import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import * as newEventActions from "../../actions/event/events.actions";
import { environment } from "../../environment";
import { INewEventState, IState } from "../../reducers";
import { Link } from "react-router-dom";

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
  updateEventVisibility: (eventVisbility: number) => any;
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

  public eventVisbilityChange = (e: any) => {
    if (this.props.eventVisibility === 1) {
      this.props.updateEventVisibility(2);
    } else {
      this.props.updateEventVisibility(1);
    }
  }

  public formatDate = (date: string) => {
    const re = /(.+)(00:00:00)(.+)/g;
    return date.replace(re, '$1');
  }

  public onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const ev = this.props;
    e.preventDefault();
    const re = /(.+)(00:00:00)(.+)/g;
    const newStartTime = ev.startDate.replace(re, '$1' + ev.startTime + ':00' + '$3');
    const newEndTime = ev.endDate.replace(re, '$1' + ev.endTime + ':00' + '$3');
    
    const event = {
      authorId: JSON.parse(localStorage.getItem("userId") || "{}"),
      description: ev.description,
      endDate: newEndTime,
      endTime: newEndTime,
      eventType: ev.eventType,
      location: ev.eventLocation,
      name: ev.name,
      startDate: newStartTime,
      startTime: newStartTime,
      visibility: ev.eventVisibility,
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
        <section className="contact pt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">New Event</h2>
                {u.startDate ? <h3 className="section-subheading text-muted">Start Date: <span className="text-success">{this.formatDate(u.startDate)}</span> - End Date: <span className="text-danger">{this.formatDate(u.endDate)}</span> </h3>
                  : <h3 className="section-subheading text-muted"><Link to="/calendar" className="nav-link">Select date</Link></h3>}
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
                        <select placeholder="Event Type" className="form-control" name="event type" onChange={this.eventTypeChange} value={u.eventType}>
                          <option value="Sports">Sports</option>
                          <option value="Movies">Movies</option>
                          <option value="Shopping">Shopping</option>
                          <option value="Beach">Beach</option>
                          <option value="Traveling">Traveling</option>
                          <option value="Gaming">Gaming</option>
                        </select>
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
                          Event Start Time *:
                        </p>

                        <input
                          onChange={this.eventStartTimeChange}
                          value={u.startTime}
                          type="time"
                          name="start time"
                          className="form-control"
                          placeholder="Start Time"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <p className="help-block text-dark">Event End Time *:</p>

                        <input
                          onChange={this.eventEndTimeChange}
                          value={u.endTime}
                          type="time"
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
                      
                     <div className="mb-2">Make Event Public? <input type="checkbox" onChange={this.eventVisbilityChange}></input></div> 

                      <button
                        className="btn btn-primary btn-xl text-uppercase px-5 mt-2"
                        type="submit"
                      >
                        Submit
                      </button>

                    </div>
                  </div>
                </form>
                <div className="col-lg-12 text-center">
                  <Link to="/calendar" className="btn btn-default btn-xl mt-2">Go Back</Link>
                </div>

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
  updateEventType: newEventActions.updateEventType,
  updateEventVisibility: newEventActions.updateEventVisibility
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewEventComponent);
