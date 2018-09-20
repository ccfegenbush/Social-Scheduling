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

    render() {
        return <div className="mt-5 pt-5 container">
            {this.props.errMessage}
            <BigCalendar events={this.props.allEvents}
                defaultDate={new Date()}
                defaultView="month"
                style={{ height: "100vh" }}
                selectable={true}
                onSelectSlot={this.onSelectSlot}
                onSelectEvent={this.toggle}
            />
            <Modal show={this.props.showModal} onHide={this.toggle}>
            <p>fwojef</p>
                <Modal.Header>Modal title</Modal.Header>
                <Modal.Body>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Modal.Body>
                <Modal.Footer>
                    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}

// const Modal = ({ handleClose, show, children }) => {
//     const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  
//     return (
//       <div className={showHideClassName}>
//         <section className='modal-main'>
//           {children}
//           <button
//             onClick={handleClose}
//           >
//             Close
//           </button>
//         </section>
//       </div>
//     );
//   };

const mapStateToProps = (state) => state.newEvent;

const mapDispatchToProps = {
    getAllEvents: newEventActions.getAllEvents,
    getErrMessage: newEventActions.getErrMessage,
    updateEventEndDate: newEventActions.updateEventEndDate,
    updateEventStartDate: newEventActions.updateEventStartDate,
    updateShowModal: newEventActions.updateShowModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCalendar);