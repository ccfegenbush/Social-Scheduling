import * as React from 'react';
import { updateUsername } from '../../actions/sign-in/sign-in.actions';
import { environment } from '../../environment';
import { AddFriendComponent } from './add-friends.component';

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
                        friends: [...this.state.friends, x.username]
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
            <section className="pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading text-uppercase">Friends List</h2>
                            <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 offset-md-2 text-right">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                                <i className="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="service-heading">Add Friends</h4>
                            <AddFriendComponent />
                        </div>
                        <div className="col-md-4 text-left">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                                <i className="fas fa-laptop fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="service-heading">Your Friends</h4>
                            <p className="text-muted">{listFriends}</p>
                        </div>

                    </div>
                </div>
            </section>
        );
    }
}
