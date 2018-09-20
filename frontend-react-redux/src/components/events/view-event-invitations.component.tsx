import * as React from 'react';
// import { updateUsername } from '../../actions/sign-in/sign-in.actions';
import { environment } from '../../environment';

export class InvitationComponent extends React.Component<any, any>  {

    public constructor(props: any) {
        super(props);
        // const userJSON = localStorage.getItem("user")
        // const user = userJSON !== null ? JSON.parse(userJSON) : updateUsername
        this.state = {
            events: [],
            invitations:[]
        }
    }

    public componentDidMount() {
        fetch(environment.context + `invitations/user/${JSON.parse(localStorage.getItem('userId') || '{}')}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(invitations => {
                this.setState({ invitations })
                console.log(this.state.invitations)
                for(const i of this.state.invitations){
                    console.log(i);
                    const eventId = i.eventId;
    
                    fetch(environment.context + `events/${eventId}`, {})
                    .then(resp => resp.json())
                    .then(event => {
                        this.setState({ 
                            ...this.state,
                            events: [...this.state.events, event]
                         })
        
                        console.log(this.state)
                    })
                    .catch(err => {
                        console.log(err)
                    })
    
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    public render() {
        return (
            <div>
                <table style={{ background: '#ADD8E6' }} className="table table-striped">

                    <thead>
                        <tr>
                            <th scope="col">Event Name</th>
                            <th scope="col">Event Author</th>
                        </tr>
                    </thead>
                    <tbody id="profile-table-body">
                        {
                            this.state.events.map((event: any) => (                            
                            <tr key={event.id} >
                                <td>{event.name}</td>
                                <td>{event.authorId}</td>
                            </tr>
                            
                        ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
