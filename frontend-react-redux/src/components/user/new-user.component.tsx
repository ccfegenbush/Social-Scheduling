import * as React from 'react';
import { environment } from '../../environment';

export class NewUserComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            age: 0,
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            username: ''
        }
    }

    public onChange = (e: any) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    public onSubmit = (e: any) => {
        const u = this.state;
        e.preventDefault();
        const user = {
            "password": u.password,
            "user_age": Number(u.age),
            "user_email": u.email,
            "user_first_name": u.firstName,
            "user_last_name": u.lastName,
            "username": u.username
        }
        fetch(environment.context + 'users/register', {
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
                    <h1 className="h3 mb-3 font-weight-normal">Create a New User</h1>

                    <label htmlFor="inputUsername" className="sr-only">Username</label>
                    <input
                    onChange={this.onChange}
                    value={u.username}
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    required />

                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input
                    onChange={this.onChange}
                    value={u.password}
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    required />

                    <label htmlFor="inputFirstName" className="sr-only">First Name</label>
                    <input
                    onChange={this.onChange}
                    value={u.firstName}
                    type="text"                    
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                    required />

                    <label htmlFor="inputLastName" className="sr-only">Last Name</label>
                    <input
                    onChange={this.onChange}
                    value={u.lastName}
                    type="text"                    
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    required />

                    <label htmlFor="inputAge" className="sr-only">Age</label>
                    <input
                    onChange={this.onChange}
                    value={u.age}
                    type="text"                    
                    name="age"
                    className="form-control"
                    placeholder="Age"
                    required />

                    <label htmlFor="inputEmail" className="sr-only">Email</label>
                    <input
                    onChange={this.onChange}
                    value={u.email}
                    type="text"                    
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    required />

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
                <p> Hello from new user! </p>
            </div>
        )
    }


}