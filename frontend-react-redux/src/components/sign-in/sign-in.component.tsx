import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ISignInState, IState } from '../../reducers';
import * as signInActions from '../../actions/sign-in/sign-in.actions';
import { connect } from 'react-redux';
import { environment } from '../../environment';

interface IProps extends RouteComponentProps<{}>, ISignInState {
  setLoginUser: (user: object) => any,
  updateError: (message: string) => any,
  updatePassword: (password: string) => any,
  updateUsername: (username: string) => any,
  submit: (credentials: any) => any
}

class SignInComponent extends React.Component<IProps, {}> {

  constructor(props: any) {
    super(props);

  }

  public submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(environment.context + 'users/login', {
      body: JSON.stringify(this.props.credentials),
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(resp => {
        console.log(resp.status)
        if (resp.status === 401) {
          this.props.updateError('Invalid Credentials');
        } else if (resp.status === 200) {
          return resp.json();
        } else {
          this.props.updateError('Failed to Login at this time');
        }
        throw new Error('Failed to login');
      })
      .then(resp => {
        localStorage.setItem('user', JSON.stringify(resp));
        localStorage.setItem('userId', JSON.stringify(resp.id));
        this.props.setLoginUser(resp);
        this.props.history.push('/calendar');
      })
      .catch(err => {
        console.log(err);
      });
  }
  public passwordChange = (e: any) => {
    this.props.updatePassword(e.target.value);
  }

  public usernameChange = (e: any) => {
    this.props.updateUsername(e.target.value);
  }

  public render() {
    const { errorMessage, credentials } = this.props;

    return (
        <section id="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Sign in</h2>
                <h3 className="section-subheading text-muted text-danger">{errorMessage && <p id="error-message">{errorMessage}</p>}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <form id="contactForm" name="sentMessage" className="form-signin" onSubmit={this.submit}>
                  <div className="row">
                    <div className="col-md-4 offset-md-4">
                      <div className="form-group">
                        <input onChange={this.usernameChange}
                          value={credentials.username}
                          type="text"
                          id="inputUsername"
                          className="form-control"
                          placeholder="Username"
                          data-validation-required-message="Please enter your username." required />
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="form-group">
                        <input className="form-control"
                          onChange={this.passwordChange}
                          value={credentials.password}
                          type="password"
                          id="inputPassword"
                          placeholder="Password" data-validation-required-message="Please enter your password." required />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-lg-4 offset-md-4 text-center">
                      <div id="success"></div>
                      <button className="btn btn-primary btn-block text-uppercase" type="submit">Sign in</button>
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

const mapStateToProps = (state: IState) => (state.signIn);
const mapDispatchToProps = {
  setLoginUser: signInActions.setLoginUser,
  updateError: signInActions.updateError,
  updatePassword: signInActions.updatePassword,
  updateUsername: signInActions.updateUsername,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);

