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

        // find all of our friends with a status of 2 or accepted
        fetch(environment.context + `requests/friend/${usersId}/status/2`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(userData => {
                this.setState({ userData })
                for (const x of userData) {
                    console.log(x.userId)

                    fetch(environment.context + `users/${x.userId}`, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'GET'
                    })
                        .then(resp => resp.json())
                        .then(user => {
                            this.setState({
                                ...this.state,
                                friends: [...this.state.friends, user.username]
                            })
                            console.log(this.state.friends)
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
                {p}>{p}</li>)
        return (
            <div>
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
