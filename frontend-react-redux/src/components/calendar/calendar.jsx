import * as React from 'react';
import BigCalendar from 'react-big-calendar';
import { connect } from 'react-redux';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { environment } from '../../environment';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class MyCalendar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            errMessage: '',
            newEvents: []
        }

    }

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
                this.setState({ newEvents: allEvents })
            })
            .catch(err => {
                this.state.errMessage = err;
            })
    }


    onSelectSlot({start, end, slots, action }){
        alert({start});
    }

    render() {
        return <div className="mt-5 pt-5 container">
            {this.state.errMessage}
            <BigCalendar events={this.state.newEvents}
                defaultDate={new Date()}
                defaultView="month"
                style={{ height: "100vh" }}
                selectable={true}
            />
        </div>
    }

}