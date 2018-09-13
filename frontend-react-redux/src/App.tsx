import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { HomeComponent } from './components/home/home.component';
import AppNav from './components/nav/nav.component';
import SignInComponent from './components/sign-in/sign-in.component';
import { NewUserComponent } from './components/user/new-user.component';
import './include/bootstrap';
import { store } from './Store';
import { SetInterestsComponent } from './components/interests/InterestComponent';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <AppNav />
            <div id="main-content-container">
              <Switch>
                <Route path="/home" component={HomeComponent} />
                <Route path="/sign-in" component={SignInComponent} />
                <Route path="/register" component={NewUserComponent} />
                <Route path="/users/set-interests" component = {SetInterestsComponent} />
                <Route component={HomeComponent} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
