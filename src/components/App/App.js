import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';

//import UserPage from '../UserPage/UserPage';


import InfoPage from '../InfoPage/InfoPage';
import UserHandler from '../UserHandler/UserHandler'
import AdminTeamPage from '../AdminTeamPage/AdminTeamPage';
import AdminVolunteerPage from '../AdminVolunteerPage/AdminVolunteerPage';
import UserDashboard from '../UserDashboard/UserDashboard';
import EditUser from '../EditUser/EditUser';
import TeamPage from '../TeamPage/TeamPage';
import TeamSearch from '../TeamSearch/TeamSearch';
import AddClient from '../AddClient/AddClient';
import EditClient from '../EditClient/EditClient';
import ClientGallery from '../ClientGallery/ClientGallery';
import Resources from '../Resources/Resources';
import ClientPage from '../ClientPage/ClientPage';
import AdminDashboard from '../AdminDashboard/AdminDashboard'

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            <Route
              exact
              path="/dev/gallery"
              component={ClientGallery}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserHandler}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            <ProtectedRoute
              exact
              path="/admin-team-page"
              component={AdminTeamPage}
            />
            <ProtectedRoute
              exact
              path="/admin-volunteer-page/:id"
              component={AdminVolunteerPage}
            />
            <ProtectedRoute
              exact
              path="/edit-user"
              component={EditUser}
            />
            <ProtectedRoute
              exact
              path="/team-page/"
              component={TeamPage}
            />
            <ProtectedRoute
              exact
              path="/team-search"
              component={TeamSearch}
            />
            <ProtectedRoute
              exact
              path="/add-client"
              component={AddClient}
            />
            <ProtectedRoute
              exact
              path="/client-page/:id"
              component={ClientPage}
            />
            <ProtectedRoute
              exact
              path="/edit-client"
              component={EditClient}
            />
            <ProtectedRoute
              exact
              path="/client-gallery"
              component={ClientGallery}
            />
            <ProtectedRoute
              exact
              path="/resources"
              component={Resources}
            />
            <ProtectedRoute
              exact
              path="/team-search"
              component={TeamSearch}
            />
            {/* <ProtectedRoute
              exact
              path="/admin-dashboard"
              component={AdminDashboard}
            /> */}
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default connect()(App);
