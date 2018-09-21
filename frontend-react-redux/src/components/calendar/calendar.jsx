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

    componentWillMount() {
        fetch(environment.context + `events`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(events => {
                let allEvents = [];
                events.forEach((item) => {
                    let oneEvent = { end: new Date(item.endTime), start: new Date(item.startTime), title: item.name };
                    allEvents.push(oneEvent);
                })
                this.props.getAllEvents(allEvents);
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

    toggle = () => {
        this.props.updateShowModal(!this.props.showModal);
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
            <BigCalendar events={this.props.allEvents}
                defaultDate={new Date()}
                defaultView="month"
                style={{ height: "100vh" }}
                selectable={true}
                onSelectSlot={this.onSelectSlot}
                onSelectEvent={this.selectedEventChange}
            />
            <Modal show={this.props.showModal} onHide={this.toggle}>
                <Modal.Header>{this.props.currentEvent.name}</Modal.Header>
                <Modal.Body>
                    {this.props.currentEvent.description}
                </Modal.Body>
                <Modal.Footer>
                    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}

const mapStateToProps = (state) => state.newEvent;

const mapDispatchToProps = {
    getAllEvents: newEventActions.getAllEvents,
    getErrMessage: newEventActions.getErrMessage,
    updateCurrentEvent: newEventActions.updateCurrentEvent,
    updateEventEndDate: newEventActions.updateEventEndDate,
    updateEventStartDate: newEventActions.updateEventStartDate,
    updateShowModal: newEventActions.updateShowModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCalendar);