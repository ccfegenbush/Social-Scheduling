import * as React from 'react';
import { updateUsername } from '../../actions/sign-in/sign-in.actions';
import { environment } from '../../environment';

export class FriendComponent extends React.Component<any, any>  {

    public constructor(props: any) {
        super(props);
        const userJSON = localStorage.getItem("user")
        const user = userJSON !== null ? JSON.parse(userJSON) : updateUsername
        this.state = {
            friends: [],
            profileInfo: [],
            userData: [],
            username: user,
        }
    }

    public componentDidMount() {
        const usersId = JSON.parse(localStorage.getItem('userId') || '{}');

        // find all of our friends
        fetch(environment.context + `users/${usersId}/friends`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(userData => {
                for (const x of userData) {
                    this.setState({
                        ...this.state,
                       friends : [...this.state.friends, x.username ]
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    public render() {
        console.log(this.state.friends)
        const listFriends = this.state.friends.map(
            (p: any) => <li key=
                {p.friend}>{p.friend}</li>)
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
                                <td>{this.state.friends.username}</td>
                                <td>{this.state.friends.firstName}</td>
                                <td>{this.state.friends.lastName}</td>
                                <td>{this.state.friends.age}</td>
                                <td>{this.state.friends.email}</td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div>
                    Friends:
                            <div>
                        {listFriends}
                    </div>
                </div>
            </div>
        );
    }
}
