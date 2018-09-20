import * as React from 'react';
import { updateUsername } from '../../actions/sign-in/sign-in.actions';
import { environment } from '../../environment';
import { FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';


export class ProfileComponent extends React.Component<any, any>  {

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
        const usersId = JSON.parse(localStorage.getItem('userId') || '{}');

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
        const img = require('../../assets/profile.jpg');
        const userInfo = this.state.username;
        const listInterests = this.state.interests.map(
            (p: any) => <li className="list-group-item" key={p.interest}>{p.interest}</li>)
        return (
            <section className="bg-light pt-5" id="team">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading text-uppercase">My Profile</h2>
                            <h3 className="section-subheading text-muted mb-3">{userInfo.username}</h3>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-6 float-right">
                            <div className="team-member">
                                <img className="mx-auto rounded-circle" src={img} />
                                <h4>{`${userInfo.firstName} ${userInfo.lastName}`}</h4>
                                <p className="text-muted">{userInfo.email}</p>
                                <ul className="list-inline social-buttons">
                                    <li className="list-inline-item">
                                        <a href="#">
                                            <FaTwitter />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#">
                                            <FaFacebookF />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#">
                                            <FaLinkedinIn />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6 mx-auto">
                            <p className="large text-muted"><strong>My Interests: </strong>                                
                                <ul className="list-group">
                                    {listInterests}
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
