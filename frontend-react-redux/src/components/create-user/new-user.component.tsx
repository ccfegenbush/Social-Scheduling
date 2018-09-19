import * as React from "react";
import { environment } from "../../environment";
import { RouteComponentProps } from "react-router";
import * as newUserActions from "../../actions/new-user/new-user.actions";
import { connect } from "react-redux";
import { INewUserState, IState } from "../../reducers";

interface IProps extends RouteComponentProps<{}>, INewUserState {
  updateAge: (age: string) => any;
  updateEmail: (email: string) => any;
  updateFirstName: (firstName: string) => any;
  updateLastName: (lastName: string) => any;
  updatePassword: (password: string) => any;
  updateUsername: (username: string) => any;
  onSubmit: (user: any) => any;
}

class NewUserComponent extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
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
            "password": u.password,
            "username": u.username
        }
        fetch(environment.context + "users/register", {
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        .then(resp => {
            console.log(resp.status)
            if (resp.status === 401) {
            console.log('Invalid request');
            } else if (resp.status === 200) {
            return resp.json();
            } else {
            console.log('Failed to create user at this time');
            }
            throw new Error('Failed to login');
      })
        .then(resp => {
            localStorage.setItem('user', JSON.stringify(resp));
            localStorage.setItem('userId', JSON.stringify(resp.id));
            this.props.history.push('/users/set-interests');
        })
        .catch(err => {
            console.log(err);
        })
    }

public render() {
    const u = this.props;
    return (
        <section className="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Register</h2>
                <h3 className="section-subheading text-muted" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">    

            <form className="form-signin" onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <p className="help-block text-dark">Your Email *:</p>
                        <input
                          className="form-control"
                          onChange={this.emailChange}
                          value={u.email}
                          type="text"
                          name="email"
                          data-validation-required-message="Please enter your email address."
                          required
                        />
                      </div>
                      <div className="form-group">
                        <p className="help-block text-dark">Your Username *:</p>
                        <input
                          className="form-control"
                          onChange={this.usernameChange}
                          value={u.username}
                          type="text"
                          name="username"
                          data-validation-required-message="Please enter your username."
                          required
                        />
                      </div>
                      <div className="form-group">
                        <p className="help-block text-dark">Your Password *:</p>
                        <input
                          className="form-control"
                          onChange={this.passwordChange}
                          value={u.password}
                          type="password"
                          name="password"
                          data-validation-required-message="Please enter your password."
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <p className="help-block text-dark">
                          Your Firstname *:
                        </p>
                        <input
                          className="form-control"
                          onChange={this.firstNameChange}
                          value={u.firstName}
                          type="text"
                          name="firstName"
                          data-validation-required-message="Please enter your first name."
                          required
                        />
                      </div>
                      <div className="form-group">
                        <p className="help-block text-dark">Your Lastname *:</p>
                        <input
                          className="form-control"
                          onChange={this.lastNameChange}
                          value={u.lastName}
                          type="text"
                          name="lastName"
                          data-validation-required-message="Please enter your last name."
                          required
                        />
                      </div>
                      <div className="form-group">
                        <p className="help-block text-dark">Your Age *:</p>
                        <input
                          className="form-control"
                          onChange={this.ageChange}
                          value={u.age}
                          type="text"
                          name="age"
                          data-validation-required-message="Please enter your age."
                          required
                        />
                      </div>
                    </div>
                    <div className="clearfix" />
                    
                    <div className="col-lg-12 text-center">
                      <button
                        className="btn btn-primary btn-xl text-uppercase px-5 mt-2"
                        type="submit"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
    );
  }
}

const mapStateToProps = (state: IState) => state.newUser;
const mapDispatchToProps = {
  updateAge: newUserActions.updateAge,
  updateEmail: newUserActions.updateEmail,
  updateFirstName: newUserActions.updateFirstName,
  updateLastName: newUserActions.updateLastName,
  updatePassword: newUserActions.updatePassword,
  updateUsername: newUserActions.updateUsername
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewUserComponent);
