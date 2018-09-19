import * as React from 'react';
import { environment } from '../../../environment';
import { RouteComponentProps } from 'react-router';
import * as newUserActions from '../../../actions/new-user/new-user.actions';
import { connect } from 'react-redux';
import { INewUserState, IState } from '../../../reducers';

interface IProps extends RouteComponentProps<{}>, INewUserState {
    updateAge: (age: string) => any,
    updateEmail: (email: string) => any,
    updateFirstName: (firstName: string) => any,
    updateLastName: (lastName: string) => any,
    updatePassword: (password: string) => any,
    updateUsername: (username: string) => any,
    onSubmit: (user: any) => any
}

class EditProfileComponent extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public componentDidMount() {
        fetch(environment.context + `users/${JSON.parse(localStorage.getItem('userId') || '{}')}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })
    .then(resp => resp.json())
    .then(user => {
        this.props.updateAge(user.age);
        this.props.updateEmail(user.email);
        this.props.updateFirstName(user.firstName);
        this.props.updateLastName(user.lastName);
        this.props.updateUsername(user.username);
    })
    }

    public usernameChange = (e: any) => {
        this.props.updateUsername(e.target.value);
    }

    public passwordChange = (e: any) => {
        this.props.updatePassword(e.target.value);
    }

    public firstNameChange = (e: any) => {
        this.props.updateFirstName(e.target.value);
    }
    
    public lastNameChange = (e: any) => {
        this.props.updateLastName(e.target.value);
    }

    public ageChange = (e: any) => {
        this.props.updateAge(e.target.value);
    }

    public emailChange = (e: any) => {
        this.props.updateEmail(e.target.value);
    }
    
    public onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const u = this.props;
        e.preventDefault();
        const user = {
            "age": Number(u.age),
            "email": u.email,
            "firstName": u.firstName,
            "lastName": u.lastName,
            "username": u.username
        }
        fetch(environment.context + `users/${JSON.parse(localStorage.getItem('userId') || '{}')}/updateUser`, {
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        .then(resp => resp.json())
        .then(userData => {
            this.props.history.push('/users/profile');
        })
        .catch(err => {
            console.log(err);
        })
    }

    public render() {
        const u = this.props;
        return (
            <div className="container mt-5 pt-5">
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Update Profile</h1>

                    <label htmlFor="inputUsername" className="sr-only">Username</label>
                    <input
                    onChange={this.usernameChange}
                    value={u.username}
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    required />

                    {/* <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input
                    onChange={this.passwordChange}
                    value={u.password}
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    required /> */}

                    <label htmlFor="inputFirstName" className="sr-only">First Name</label>
                    <input
                    onChange={this.firstNameChange}
                    value={u.firstName}
                    type="text"                    
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                    required />

                    <label htmlFor="inputLastName" className="sr-only">Last Name</label>
                    <input
                    onChange={this.lastNameChange}
                    value={u.lastName}
                    type="text"                    
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    required />

                    <label htmlFor="inputAge" className="sr-only">Age</label>
                    <input
                    onChange={this.ageChange}
                    value={u.age}
                    type="text"                    
                    name="age"
                    className="form-control"
                    placeholder="Age"
                    required />

                    <label htmlFor="inputEmail" className="sr-only">Email</label>
                    <input
                    onChange={this.emailChange}
                    value={u.email}
                    type="text"                    
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    required />

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
                
            </div>
        )
    }
}

    const mapStateToProps = (state: IState) => (state.newUser);
    const mapDispatchToProps = {
        updateAge: newUserActions.updateAge,
        updateEmail: newUserActions.updateEmail,
        updateFirstName: newUserActions.updateFirstName,
        updateLastName: newUserActions.updateLastName,
        updatePassword: newUserActions.updatePassword,
        updateUsername: newUserActions.updateUsername
    }
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileComponent);