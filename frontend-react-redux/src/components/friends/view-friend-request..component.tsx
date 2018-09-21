import * as React from 'react';
import { environment } from '../../environment';

export class FriendRequestComponent extends React.Component<any, any>  {

    public constructor(props: any) {
        super(props);
        this.state = {
            currentRequest: [],
            friends: [],
            newRequests: {},
            requestId: 0,
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
        fetch(environment.context + `requests/friend/${userId}/fr/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })

            .then(resp => resp.json())
            .then(newRequests => {
                this.setState({ newRequests })
                console.log(this.state.newRequests)
                for (const i of this.state.newRequests) {
                    console.log(i);
                    const requestId = i.requestId;
                    const statusId = {"statusId": 2} 
                    fetch(environment.context + `requests/editStatus/${requestId}`, {
                        body: JSON.stringify(statusId),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        method: 'PUT'
                    })
                        .then(resp => resp.json())
                  
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    public onDeny = (friendId: any, e: any) => {
        console.log(`denying with id: ${friendId}`)
        const userId = JSON.parse(localStorage.getItem('userId') || '{}')
        console.log(`userId: ${userId}`)
        e.preventDefault();

        const id = friendId
        fetch(environment.context + `requests/friend/${userId}/fr/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })

            .then(resp => resp.json())
            .then(newRequests => {
                this.setState({ newRequests })
                console.log(this.state.newRequests)
                for (const i of this.state.newRequests) {
                    console.log(i);
                    const requestId = i.requestId;

                    const statusId = {"statusId": 3} 
                    fetch(environment.context + `requests/editStatus/${requestId}`, {
                        body: JSON.stringify(statusId),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        method: 'PUT'
                    })
                        .then(resp => resp.json())
                  
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
