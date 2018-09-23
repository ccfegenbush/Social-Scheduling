import * as React from 'react';
import { environment } from '../../environment';
import * as Autocomplete from 'react-autocomplete';

export class AddFriendComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            friendId: 0,
            friendName: '',
            selectedUsername: '',
            userData: [],
      
            usernames: []
        }
    }

    public componentDidMount() {
        fetch(environment.context + 'users', {
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
                        usernames: [...this.state.usernames, x.username]
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    public onAddFriend = (e: any) => {
        let friendId = 1;
        const username = this.state.value
        const userId = JSON.parse(localStorage.getItem('userId') || '{}');
        e.preventDefault();

        // get the users id from their username

        fetch(environment.context + `users/${username}/find`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(data => {
                console.log("data"+data)
                friendId = data
                const id = { "id": friendId }
                console.log("userid: " + userId)
                console.log("friendid: " + friendId)
                fetch(environment.context + `users/${userId}/addFriendRequest`, {
                    body: JSON.stringify(id),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                })
                    .then(resp => resp.json())
                    .catch(err => {
                        console.log(err);
                    })
                
            })
            .catch(err => {
                console.log(err)
            })   
    }

    public matchUserNames(state: any, value: any) {
        return (
            state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
    }

    public getUsernames() {
        const allUsers = this.state.usernames
        const usernameObjs = allUsers.map((username: any) => ({ name: username }));
        return usernameObjs
    }

    public render() {
        return (
            <React.Fragment>
                <div className="mb-2">
                    <span className="btn btn-primary px-5" onClick={this.onAddFriend}> Add Friend! </span>
                </div>
                <Autocomplete
                    value={this.state.value}
                    inputProps={{ id: 'states-autocomplete' }}
                    wrapperStyle={{ position: 'relative', display: 'inline-block' }}
                    items={this.getUsernames()}
                    getItemValue={item => item.name}
                    shouldItemRender={this.matchUserNames}
                    onChange={(event, value) => this.setState({ value })}
                    onSelect={value => this.setState({ value })}
                    renderMenu={children => (
                        <div className="menu">
                            {children}
                        </div>
                    )}
                    renderItem={(item, isHighlighted) => (
                        <div
                            className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                            key={item.abbr} >
                            {item.name}
                        </div>
                    )}
                />
            </React.Fragment>
        );
    }
}