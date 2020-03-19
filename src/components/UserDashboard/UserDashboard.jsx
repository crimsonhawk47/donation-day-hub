import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import { Router, Route, Link, withRouter } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#283748',
    },
    secondary: {
      main: '#6d89b1'
    },
    tertiary: {
      main: '#808281'
    },
  },
})

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  },
});

class UserDashboard extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

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
    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Paper className={classes.root}>

          <h1 id="welcome">
            Welcome, {this.props.reduxStore.user.username}!
        </h1>
          <div>
            {!this.props.reduxStore.user.active_team ?
              <Fab
                variant="extended"
                size="small"
                color="secondary"
                onClick={this.handleJoinTeam}
              >
                Join Team
            </Fab>
              :
              <></>
            }

            <a href="https://www.google.com/maps/d/viewer?mid=1YNvABle8y-WI0FApN89Lv9vb9uvhxXfe&ll=44.97750434462346%2C-93.27893059999997&z=14">
              Donation Day Map
          </a>

          </div>
          {/* RENDER USER PHONE, EMAIL, AND ADDRESS */}
          <div>
            <p>{this.props.reduxStore.user.phone}</p> 
            <p>{this.props.reduxStore.user.email}</p>
            <p>{this.props.reduxStore.user.street_address} 
            <br />
            {this.props.reduxStore.user.city}, {this.props.reduxStore.user.state} {this.props.reduxStore.user.zip}</p>
          </div>
          <br />
          <Fab
            variant="extended"
            size="small"
            color="secondary"
            onClick={this.handleEditProfile}
          >
            Edit Profile
          </Fab>
        </Paper>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(UserDashboard)))