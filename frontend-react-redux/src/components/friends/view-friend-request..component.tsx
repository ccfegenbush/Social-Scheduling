import * as React from 'react';
import { updateUsername } from '../../actions/sign-in/sign-in.actions';
import { environment } from '../../environment';

export class FriendRequestComponent extends React.Component<any, any>  {

    public constructor(props: any) {
        super(props);
        const userJSON = localStorage.getItem("user")
        const user = userJSON !== null ? JSON.parse(userJSON) : updateUsername
        this.state = {
            age: '',
            email: '',
            firstname: '',
            interests: [],
            lastname: '',
            profileInfo: [],
            username: user,
        }
    }

    public componentDidMount() {

        let usersId = this.state.username === null ? this.state.username.usersId : 1
        usersId = Number(usersId);

        fetch(environment.context + `users/${usersId}`, {})
            .then(resp => resp.json())
            .then(profileInfo => {

                this.setState({ profileInfo })
                console.log(this.state.username)
            })
            .catch(err => {
                console.log(err)
            })

        fetch(environment.context + `users/${usersId}/interests`, {})
            .then(resp => resp.json())
            .then(interests => {
                this.setState({ interests })
                console.log(this.state.interests)
            })
            .catch(err => {
                console.log(err)
            })
    }

    public render() {
       const listInterests = this.state.interests.map(
           (p:any) => <li key = 
           {p.interest}>{p.interest}</li>)
        return (
            <div>
                <table style={{ background: '#ADD8E6' }} className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody id="profile-table-body">
                        {
                            <tr key={this.state.id} >
                                <td>{this.state.username.username}</td>
                                <td>{this.state.username.firstName}</td>
                                <td>{this.state.username.lastName}</td>
                                <td>{this.state.username.age}</td>
                                <td>{this.state.username.email}</td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div>
                    Interests:
                            <div>
                                {listInterests}
                            </div>
                </div>
            </div>
        );
    }
}
