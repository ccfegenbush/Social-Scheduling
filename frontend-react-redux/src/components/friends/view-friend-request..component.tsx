import * as React from 'react';
import { environment } from '../../environment';

export class FriendRequestComponent extends React.Component<any, any>  {

    public constructor(props: any) {
        super(props);
        this.state = {
            friends: [],
            requests: []
        }
    }

    public componentDidMount() {
        fetch(environment.context + `requests/user/${JSON.parse(localStorage.getItem('userId') || '{}')}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(requests => {
                this.setState({ requests })
                console.log(this.state.requests)
                for (const i of this.state.requests) {
                    console.log(i);
                    const friendId = i.friendId;

                    fetch(environment.context + `users/${friendId}`, {})
                        .then(resp => resp.json())
                        .then(friend => {
                            this.setState({
                                ...this.state,
                                friends: [...this.state.friends, friend]
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
                            <th scope="col">Username</th>
                            <th scope="col">Requestor's name</th>
                        </tr>
                    </thead>
                    <tbody id="profile-table-body">
                        {
                            this.state.friends.map((friend: any) => (
                                <tr key={friend.id} >
                                    <td>{friend.username}</td>
                                    <td>{friend.firstName}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
