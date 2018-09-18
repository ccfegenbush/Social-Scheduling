import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import MyCalendar from './components/calendar/calendar';
import { AddFriendComponent } from './components/friends/add-friends.component';
import AppNav from './components/nav/nav.component';
import SignInComponent from './components/sign-in/sign-in.component';
import NewUserComponent from './components/create-user/new-user.component';
import './include/bootstrap';
import { store } from './Store';
import { LandingPage } from './views/landingPage';
import newEventComponent from './components/events/new-event.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InterestsFormComponent } from './components/interests/interests-form.component';

class App extends React.Component {
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
                <Route path="/calendar" component={MyCalendar} />                
                <Route path="/set-interests" component = {InterestsFormComponent} />
                <Route path="/add-friends" component = {AddFriendComponent} />
                <Route path="/make-event" component = {newEventComponent} />
                <Route path="/profile" component={ProfileComponent} />
                <Route path="/" component={LandingPage} />
                <Route component={LandingPage} />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
