import * as React from 'react';
import { updateUsername } from '../../actions/sign-in/sign-in.actions';
import { environment } from '../../environment';
import { AddFriendComponent } from './add-friends.component';
// import { BufferViewProfile } from './view-friend-buffer.component';
import { Link } from 'react-router-dom';

export class FriendComponent extends React.Component<any, any>  {

    public constructor(props: any) {
        super(props);
        const userJSON = localStorage.getItem("user")
        const user = userJSON !== null ? JSON.parse(userJSON) : updateUsername
        this.state = {
            friends: [],
            newTo: {
                param1: '',
                pathname: "/friends-profile"
            },
            profileInfo: [],
            selectedFriend: '',
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

    public changeNewFriend(friendName: string) {
        console.log("change works")
        this.setState({
            ...this.state,
            newTo: {
                ...this.state.newTo,
                param1: friendName
            }
        })
    }

    public render() {
        console.log(this.state.friends)

        const listFriends = this.state.friends.map(
            (username: any) =>
                <li onClick={() => this.changeNewFriend(username)}
                    className="list-group-item"
                    key={username}
                >

                    <Link to={this.state.newTo}  >
                        {username}
                    </Link>
                </li>
        )

        return (
            <section className="pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading text-uppercase">Friends</h2>
                            <h3 className="section-subheading text-muted">The more the merrier.</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 offset-md-2 text-center bg-light pb-3">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                                <i className="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="service-heading">Add Friends</h4>
                            <AddFriendComponent />
                        </div>
                        <div className="col-md-4 text-center bg-light pb-3">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                                <i className="fas fa-laptop fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="service-heading">My Friends</h4>
                            <ul className="list-group text-muted">
                                {listFriends}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
