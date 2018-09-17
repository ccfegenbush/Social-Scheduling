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
            events: [
                {
                    end: new Date(moment().add(1, "days")),
                    start: new Date(),
                    title: "Some title"
                }
            ],
            newEvents: []
        }

    }

    componentDidMount() {
        fetch(environment.context + `events`, {})
        .then(resp => resp.json())
        .then(events => {
            this.setState({newEvents: events})
        })
        .catch(err => {
            this.state.errMessage = err;
        })
    }

    render() {
        return <div className="mt-5 pt-5 container">
            {this.state.newEvents}
            {this.state.errMessage}
            <BigCalendar events={this.state.events}
                defaultDate={new Date()}
                defaultView="month"
                style={{ height: "100vh" }}
            />
        </div>
    }

}

// const mapStateToProps = (state) => (state)
// export default connect(mapStateToProps)(MyCalendar);