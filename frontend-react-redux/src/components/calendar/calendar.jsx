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

    componentDidMount() {
        alert(JSON.parse(localStorage.getItem('userId') || '{}'))
        fetch(environment.context + `users/${JSON.parse(localStorage.getItem('userId') || '{}')}/friends`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(friends => {
                this.props.setUserFriends(friends);
            })
            .catch(err => {
                this.props.getErrMessage(err);
            })
        fetch(environment.context + `users/${JSON.parse(localStorage.getItem('userId') || '{}')}/interests`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(interests => {
                this.props.setUserInterests(interests);
            })
            .catch(err => {
                this.props.getErrMessage(err);
            })
        fetch(environment.context + `events`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(events => {
                if (this.props.calendarEvents.length === 1) {
                events.forEach((item) => {
                    let oneEvent = { end: new Date(item.endTime), start: new Date(item.startTime), title: item.name };
                    for (let j of this.props.userFriends) {
                        for (let i of this.props.userInterests) {
                            if (i.interest === item.eventType) {
                                if (j.id === item.authorId || item.authorId === JSON.parse(localStorage.getItem('userId') || '{}')) {
                                    if (item.visibility === 2) {
                                        alert("private friends")
                                        this.props.setPrivateEvents(oneEvent);
                                    } else {
                                        alert("public friends")
                                        this.props.setPublicEvents(oneEvent);
                                    }
                                } else {
                                    if (item.visibility === 1) {
                                        alert("public not friends")
                                        this.props.setPublicEvents(oneEvent);
                                    }
                                }
                            }
                        }
                    }
                }
                )
                this.props.updateCalendarEvents(this.props.privateEvents)
            }})
            .catch(err => {
                this.props.getErrMessage(err);
            })
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

    togglePublicPrivate = () => {

        if (this.props.showPublic) {
            this.props.updateCalendarEvents(this.props.publicEvents);
            this.props.updateShowPublic(!this.props.showPublic);
        } else {
            this.props.updateCalendarEvents(this.props.privateEvents);
            this.props.updateShowPublic(!this.props.showPublic);
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
    }

    render() {
        return <div className="mt-3 container">
            {this.props.errMessage}
            <button onClick={this.togglePublicPrivate}>Public/Private</button>
            <BigCalendar events={this.props.calendarEvents}
                defaultDate={new Date()}
                defaultView="month"
                style={{ height: "100vh" }}
                selectable={true}
                onSelectSlot={this.onSelectSlot}
                onSelectEvent={this.selectedEventChange}
            />
            <Modal show={this.props.showModal} onHide={this.toggleModal}>
                <Modal.Header>{this.props.currentEvent.name}</Modal.Header>
                <Modal.Body>
                    {this.props.currentEvent.description}
                </Modal.Body>
                <Modal.Footer>
                    <Button color="primary" onClick={this.toggleModal}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
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
    updateEventEndDate: newEventActions.updateEventEndDate,
    updateEventStartDate: newEventActions.updateEventStartDate,
    updateShowModal: newEventActions.updateShowModal,
    updateShowPublic: newEventActions.updateShowPublic
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCalendar);