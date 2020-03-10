import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class UserDashboard extends Component {

  render() {
    console.log(this.props);

    return (
      <>
        <h1 id="welcome">
          Welcome, {this.props.reduxStore.user.username}!
        </h1>
        <div>
          <button>Team Page</button>
          <button>Join Team</button>
          <button>Edit Profile</button>
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