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
                    const friendId = i.userId;

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

    public onApprove = (friendId: any, e: any) => {
        console.log(`approving with id: ${friendId}`)
        const userId = JSON.parse(localStorage.getItem('userId') || '{}')
        console.log(`userId: ${userId}`)
        e.preventDefault();
        
        const id = friendId
        fetch(environment.context + `users/${userId}/addFriend`, {
            body: JSON.stringify(id),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'Post'
        })
            .then(resp => {
            console.log(resp.status)
            if (resp.status === 401) {
            console.log('Invalid request');
            } else if (resp.status === 200) {
            return resp.json();
            } else {
            console.log('Failed to approve user at this time');
            }
            throw new Error('Failed to make friend');
      })
            .catch(err => {
                console.log(err);
            })
    }

    public onDeny = (friendId: any, e: any) => {
        console.log(`denying with id: ${friendId}` )
        e.preventDefault();
        fetch(environment.context + `requests/editStatus/${JSON.parse(localStorage.getItem('userId') || '{}')}`, {
            body: JSON.stringify(friendId),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'Post'
        })
            .then(resp => resp.json())
            .catch(err => {
                console.log(err);
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
                            <th scope="col">Accept or Deny</th>
                        </tr>
                    </thead>
                    <tbody id="profile-table-body">
                        {
                            this.state.friends.map((friend: any) => (
                                <tr key={friend.id} >
                                    <td>{friend.username}</td>
                                    <td>{friend.firstName}</td>
                                    <td>
                                        <button onClick={(e) => this.onApprove(friend.id, e)}>
                                            Accept
                                        </button>
                                        <button onClick={(e) => this.onDeny(friend.id, e)}>
                                            Deny
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
