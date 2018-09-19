import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import MyCalendar from './components/calendar/calendar';
import NewUserComponent from './components/create-user/new-user.component';
import { InvitationComponent } from './components/events/view-event-invitations.component';
import { AddFriendComponent } from './components/friends/add-friends.component';
import AppNav from './components/nav/nav.component';
import { ProfileComponent } from './components/profile/profile.component';
import SignInComponent from './components/sign-in/sign-in.component';
import './include/bootstrap';
import { store } from './Store';
import { LandingPage } from './views/landingPage';
import newEventComponent from './components/events/new-event.component';
import { InterestsFormComponent } from './components/interests/interests-form.component';
<<<<<<< HEAD
import editProfileComponent from './components/profile/edit-profile/edit-profile.component';
import { FriendComponent } from './components/friends/view-friends';
=======
import EditProfileComponent from './components/profile/edit-profile/edit-profile.component';
import { EditInterestsComponent } from './components/profile/edit-interests/edit-interests.component';
>>>>>>> a3da4bac0570807ad5f8268c341c98abca1c713a

class App extends React.Component {
  public state = { value: '' };
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <AppNav />
            <div id="main-content-container">
              <Switch>
                <Route path="/home" component={LandingPage} />
                <Route path="/sign-in" component={SignInComponent} />
                <Route path="/register" component={NewUserComponent} />
                <Route path="/calendar" component={MyCalendar} />
                <Route path="/set-interests" component={InterestsFormComponent} />
                <Route path="/add-friends" component={AddFriendComponent} />
                <Route path="/make-event" component={newEventComponent} />
                <Route path="/events/invitations" component={InvitationComponent} />
                <Route path="/profile" component={ProfileComponent} />
<<<<<<< HEAD
                <Route path="/edit-profile" component={editProfileComponent} />
                <Route path="/view-friends" component={FriendComponent} />
=======
                <Route path="/edit-profile" component={EditProfileComponent} />
                <Route path="/edit-interests" component={EditInterestsComponent} />
>>>>>>> a3da4bac0570807ad5f8268c341c98abca1c713a
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
