import * as React from 'react';
import { environment } from '../../environment';

export class AddFriendComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            friendName: '',
            username: ''
        }
    }

    public onChange = (e: any) => {
        console.log(this.state)
        this.setState({ [e.target.name]: e.target.value })
        const u = this.state;
        e.preventDefault();
        const user = {
            friendName: u.friendName,
            username: u.username
        }
        fetch(environment.context + 'users', {
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(userData => {
                this.props.history.push('/home');
            })
            .catch(err => {
                console.log(err);
            })
    }

    public onSubmit = (e: any) => {
        const u = this.state;
        e.preventDefault();
        const user = {
            friendName: u.friendName,
            username: u.username
        }
        fetch(environment.context + 'friends', {
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(userData => {
                this.props.history.push('/home');
            })
            .catch(err => {
                console.log(err);
            })
    }

    public onAddFriend = (e: any) => {
        const u = this.state;
        e.preventDefault();
        const user = {
            friendName: u.friendName,
            username: u.username
        }
        fetch(environment.context + 'friends', {
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(resp => resp.json())
            .then(userData => {
                this.props.history.push('/home');
            })
            .catch(err => {
                console.log(err);
            })
    }

    public render() {
        const u = this.state;
        return (
            <div>
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Search for Friends by name</h1>

                    <label htmlFor="inputUsername" className="sr-only">Search for friends!</label>
                    <input
                        onChange={this.onChange}
                        value={u.username}
                        type="text"
                        name="friendName"
                        className="form-control"
                        placeholder="Friend Name"
                        required />

                    <button className="btn btn-lg btn-primary btn-block" type="Search">Search for a Friend</button>
                </form>

                <thead>
                    <tr>
                        <th scope="Friend Name"> Friend Name:</th>
                    </tr>
                </thead>
            </div>
        )
    }
}