import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import MyCalendar from './components/calendar/calendar';
import NewUserComponent from './components/create-user/new-user.component';
import newEventComponent from './components/events/new-event.component';
import { InvitationComponent } from './components/events/view-event-invitations.component';
import { AddFriendComponent } from './components/friends/add-friends.component';
import AppNav from './components/nav/nav.component';
import { ProfileComponent } from './components/profile/profile.component';
import SignInComponent from './components/sign-in/sign-in.component';
import './include/bootstrap';
import { store } from './Store';
import { LandingPage } from './views/landingPage';
<<<<<<< HEAD
=======
import newEventComponent from './components/events/new-event.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InterestsFormComponent } from './components/interests/interests-form.component';
>>>>>>> 2b98550e85cdf761e1228b1c0ff62420b1198791

class App extends React.Component {
  public state = { value: '' };
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <AppNav />
            <div id="main-content-container" className="mb-5 pb-5">
              <Switch>
                <Route path="/home" component={LandingPage} />
                <Route path="/sign-in" component={SignInComponent} />
                <Route path="/register" component={NewUserComponent} />
<<<<<<< HEAD
                <Route path="/calendar" component={MyCalendar} />
                <Route path="/users/set-interests" component={SetInterestsComponent} />
                <Route path="/add-friends" component={AddFriendComponent} />
                <Route path="/make-event" component={newEventComponent} />
                <Route path="/events/invitations" component={InvitationComponent} />
=======
                <Route path="/calendar" component={MyCalendar} />                
                <Route path="/set-interests" component = {InterestsFormComponent} />
                <Route path="/add-friends" component = {AddFriendComponent} />
                <Route path="/make-event" component = {newEventComponent} />
>>>>>>> 2b98550e85cdf761e1228b1c0ff62420b1198791
                <Route path="/profile" component={ProfileComponent} />
                <Route path="/" component={LandingPage} />
                <Route component={LandingPage} />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
