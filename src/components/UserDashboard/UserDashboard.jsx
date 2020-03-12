import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';



const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class UserDashboard extends Component {

  handleEditProfile = () => {
    console.log('clicked Edit Profile button');
    this.props.history.push('/edit-user')
  }

  handleJoinTeam = () => {
    console.log('clicked Join Team button');
    this.props.history.push('/team-search')
  }
  
  handleTeamPage = () => {
    console.log('clicked Team Page button');
    this.props.history.push('/team-page')
  }
  

  render() {
    console.log(this.props);

    return (
      <>
        <h1 id="welcome">
          Welcome, {this.props.reduxStore.user.username}!
        </h1>
        <div>
          <button onClick={this.handleTeamPage}>Team Page</button>
          <button onClick={this.handleJoinTeam}>Join Team</button>
          <button onClick={this.handleEditProfile}>Edit Profile</button>
          <Link to="/resources">Important Links</Link>
        </div>
        {/* RENDER USER PHONE, EMAIL, AND ADDRESS */}
        <div>
          {this.props.reduxStore.user.phone} <br />
          {this.props.reduxStore.user.email} <br />
          {this.props.reduxStore.user.street_address} <br />
          {this.props.reduxStore.user.city}, {this.props.reduxStore.user.state} {this.props.reduxStore.user.zip} <br />
        </div>
      </>
    )
  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}

export default withStyles(styles)(connect(mapStateToProps)(UserDashboard))