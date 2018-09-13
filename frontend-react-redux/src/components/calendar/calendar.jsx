import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import { connect } from 'react-redux';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

let events = [
    {
        end: new Date(moment().add(1, "days")),
        start: new Date(),
        title: "Some title"
    }
]

const MyCalendar = (props) => {
    return <div>
        <BigCalendar events={events}
            defaultDate={new Date()}
            defaultView="month"
            style={{ height: "100vh" }}
        />
    </div>

}

export default MyCalendar;