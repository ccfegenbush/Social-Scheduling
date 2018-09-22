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
        fetch(environment.context + `events`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(events => {
                let privateEvents = [];
                let publicEvents = [];
                events.forEach((item) => {
                    let oneEvent = { end: new Date(item.endTime), start: new Date(item.startTime), title: item.name };
                    if (item.visibility === 2) {
                        privateEvents.push(oneEvent);
                    } else {
                        publicEvents.push(oneEvent);
                    }
                })
                this.props.setPrivateEvents(privateEvents);
                this.props.setPublicEvents(publicEvents);
                this.props.updateCalendarEvents(privateEvents);
            })
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
        return <div className="mt-5 pt-5 container">
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
    updateCalendarEvents: newEventActions.updateCalendarEvents,
    updateCurrentEvent: newEventActions.updateCurrentEvent,
    updateEventEndDate: newEventActions.updateEventEndDate,
    updateEventStartDate: newEventActions.updateEventStartDate,
    updateKey: newEventActions.updateKey,
    updateShowModal: newEventActions.updateShowModal,
    updateShowPublic: newEventActions.updateShowPublic
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCalendar);