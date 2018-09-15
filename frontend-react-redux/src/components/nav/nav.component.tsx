import * as React from 'react';
import { Link } from 'react-router-dom';
import { IState } from '../../reducers';
import { connect } from 'react-redux';

const AppNav: React.StatelessComponent<any> = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand js-scroll-trigger">Social Planit</a>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
        <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav text-uppercase ml-auto">
            {(localStorage.getItem('userId')) ? <li className="nav-item">
              {JSON.parse(localStorage.getItem('userId') || '{}')} </li> : null}

            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/sign-in" className="nav-link">Sign In</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/calendar" className="nav-link">Calendar</Link>
            </li>

            <li className="nav-item">
              <Link to="/make-event" className="nav-link">Make Event</Link>
            </li>

            <li className="nav-item">
              <Link to="/users/set-interests" className="nav-link">Set Interests</Link>
            </li>

            <li className="nav-item">
              <Link to="/add-friends" className="nav-link">Add Friends</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state: IState) => (state)
export default connect(mapStateToProps)(AppNav);