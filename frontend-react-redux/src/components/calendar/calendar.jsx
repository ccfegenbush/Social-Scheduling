import * as React from 'react';
import BigCalendar from 'react-big-calendar';
import { connect } from 'react-redux';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { environment } from '../../environment';
import * as newEventActions from "../../actions/event/events.actions";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Modal } from 'react-bootstrap';


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class MyCalendar extends React.Component {

    fetchFriends = () => {
        fetch(environment.context + `users/${JSON.parse(localStorage.getItem('userId') || '{}')}/friends`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(friends => {
                this.props.setUserFriends(friends);
                this.fetchInterests();
            })
            .catch(err => {
                this.props.getErrMessage(err);
            })
    }

    fetchInterests = () => {
        fetch(environment.context + `users/${JSON.parse(localStorage.getItem('userId') || '{}')}/interests`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(interests => {
                this.props.setUserInterests(interests);
                this.fetchEvents();
            })
            .catch(err => {
                this.props.getErrMessage(err);
            })
    }

    fetchEvents = () => {
        fetch(environment.context + `events`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(events => {
                let newAllPrivateEvent = [];
                let newAllPublicEvent = [];
                let newShowEvents = [];
                events.forEach((item) => {
                    let oneEvent = { end: new Date(item.endTime), start: new Date(item.startTime), title: item.name };
                    if (this.props.userInterests.filter(e => e.interest === item.eventType).length > 0) {
                        if (this.props.userFriends.filter(e => e.id === item.id).length > 0 ||
                            item.authorId === JSON.parse(localStorage.getItem('userId') || '{}')) {
                            if (!this.props.publicEvents.includes(item) ||
                                !this.props.privateEvents.includes(item)) {
                                if (item.visibility === 2) {
                                    newAllPrivateEvent.push(oneEvent);
                                } else {
                                    newAllPublicEvent.push(oneEvent);
                                }
                            }

                        }
                    }
                })
                this.props.setPrivateEvents(newAllPrivateEvent);
                this.props.setPublicEvents(newAllPublicEvent);
                newShowEvents = newAllPrivateEvent;
                this.props.updateCalendarEvents(newShowEvents);
                this.props.updateShowPublic(false);
            })
            .catch(err => {
                this.props.getErrMessage(err);
            })
    }

    componentDidMount() {
        this.fetchFriends();
    }

    onSelectSlot = (slotInfo) => {
        this.props.updateEventStartDate(slotInfo.start.toString());
        this.props.updateEventEndDate(slotInfo.end.toString());
        this.props.history.push('/make-event');
        return;
    }

    toggleModal = () => {
        this.props.updateShowModal(!this.props.showModal);
    }

    makeUnique = (a) => {
        return Array.from(new Set(a));
    }

    togglePublicPrivate = () => {
            
        if (this.props.showPublic === false) {
            this.props.updateCalendarEvents(this.props.publicEvents);
            // this.props.updateCalendarEvents(this.makeUnique(this.props.calendarEvents));
            this.props.updateShowPublic(true);
        } else {
            this.props.updateCalendarEvents(this.props.privateEvents);
            // this.props.updateCalendarEvents(this.makeUnique(this.props.calendarEvents));
            this.props.updateShowPublic(false);
        }
    }

    selectedEventChange = (event, e) => {
        this.props.updateShowModal(!this.props.showModal);
        fetch(environment.context + `events/name/${event.title}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(eventData => {
                this.props.updateCurrentEvent(eventData);
            })
            .catch(err => {
                this.props.getErrMessage(err);
            })
        fetch(environment.context + `users/${this.props.currentEvent.authorId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(user => {
                this.props.updateEventAuthor(user);
            })
            .catch(err => {
                this.props.getErrMessage(err);
            })
    }

    render() {
        return <div className="mt-3 container">
            {this.props.errMessage}
            { (this.props.showPublic === false) ? <button onClick={this.togglePublicPrivate} className="btn btn-dark mb-1"> Private </button>
                : <button onClick={this.togglePublicPrivate} className="btn btn-info mb-1">Public</button>
            }

            <BigCalendar events={this.props.calendarEvents}
                defaultDate={new Date()}
                defaultView="month"
                style={{ height: "100vh" }}
                selectable={true}
                onSelectSlot={this.onSelectSlot}
                onSelectEvent={this.selectedEventChange}
            />
            <Modal show={this.props.showModal} onHide={this.toggleModal}>
                <Modal.Header className="bg-light text-uppercase">
                    Title: {this.props.currentEvent.name} <br/>
                    By: {this.props.author.firstName + ' ' + this.props.author.lastName}
                </Modal.Header>
                <Modal.Body>
                    <p className="item-intro text-muted">Type: {this.props.currentEvent.eventType}</p>
                    <p className="item-intro text-muted">Location: {this.props.currentEvent.location}</p>
                    <p className="item-intro text-muted">Description: {this.props.currentEvent.description}</p>
                    <p className="item-intro text-muted">Contact: {this.props.author.email}</p>
                </Modal.Body>
                <Modal.Footer className="bg-light">
                    <Button color="secondary" onClick={this.toggleModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}

const mapStateToProps = (state) => state.newEvent;

const mapDispatchToProps = {
    getErrMessage: newEventActions.getErrMessage,
    setPrivateEvents: newEventActions.setPrivateEvents,
    setPublicEvents: newEventActions.setPublicEvents,
    setUserFriends: newEventActions.setUserFriends,
    setUserInterests: newEventActions.setUserInterests,
    updateCalendarEvents: newEventActions.updateCalendarEvents,
    updateCurrentEvent: newEventActions.updateCurrentEvent,
    updateEventAuthor: newEventActions.updateEventAuthor,
    updateEventEndDate: newEventActions.updateEventEndDate,
    updateEventStartDate: newEventActions.updateEventStartDate,
    updateShowModal: newEventActions.updateShowModal,
    updateShowPublic: newEventActions.updateShowPublic
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCalendar);