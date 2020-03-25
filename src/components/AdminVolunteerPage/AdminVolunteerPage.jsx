import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const moment = require('moment');

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

class AdminVolunteerPage extends Component {
  state = {
    openCaptain: false,
    openAdmin: false
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_VOLUNTEER_INFO',
      payload: this.props.match.params.id
    })
  }

  makeCaptain = () => {
    console.log('clicked make captain button');
    this.props.dispatch({
      type: 'ADMIN_MAKE_CAPTAIN',
      payload: this.props.reduxStore.adminVolunteerInfo
    })
  }

  makeAdmin = () => {
    this.props.dispatch({
      type: 'ADMIN_MAKE_ADMIN',
      payload: this.props.reduxStore.adminVolunteerInfo.id,
      history: this.props.history
    })
  }

  goToTeam = () => {
    const currentVolunteerId = this.props.reduxStore.adminVolunteerInfo.active_team
    this.props.history.push(`/admin-team-page/${currentVolunteerId}`)

  }

  // Make Captain Popup open and close
  handleClickOpen = () => {
    this.setState({ openCaptain: true });
  };

  handleClosePopup = () => {
    this.setState({ openCaptain: false });
  };

  // Make Admin Popup open and close
  handleClickOpenAdmin = () => {
    this.setState({ openAdmin: true });
  };

  handleClosePopupAdmin = () => {
    this.setState({ openAdmin: false });
  };

  render() {
    let volunteer = this.props.reduxStore.adminVolunteerInfo;
    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <h1>{volunteer.first_name} {volunteer.last_name}</h1>
          {volunteer.access_level === 2 || volunteer.active_team ?
            <></>
            :
            <Fab
              variant="extended"
              color="secondary"
              size="small"
              onClick={this.handleClickOpen}
            >
              Make Captain
          </Fab>}
          {volunteer.active_team ?
            <Fab
              variant="extended"
              color="secondary"
              size="small"
              onClick={this.goToTeam}
            >
              View Current Team
          </Fab>
            :
            <></>
          }
          {/* POPUP AFTER MAKE CAPTAIN BUTTON SELECTED */}
          <div>
            <Dialog open={this.state.openCaptain} onClose={this.handleClosePopup} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">MAKE CAPTAIN</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to make this person a team captain?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClosePopup} color="primary">
                  No
                </Button>
                <Button onClick={() => {
                  { this.makeCaptain() };
                  { this.handleClosePopup() };
                }} color="primary">
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <p><b>Username:</b> {volunteer.username}</p>
          <p><b>Member since:</b> {moment(volunteer.date_registered).format('LL')}</p>
          <p>{volunteer.email}</p>
          <p>{volunteer.phone}</p>
          <p>
            {volunteer.street_address}
            <br />
            {volunteer.city}, {volunteer.state} {volunteer.zip}
          </p>
          <Grid container justify='flex-end'>
            <Button size='small' variant='outlined' onClick={this.handleClickOpenAdmin}>Make Admin</Button>
          </Grid>
          {/* POPUP AFTER MAKE ADMIN BUTTON SELECTED */}
           <div>
          <Dialog open={this.state.openAdmin} onClose={this.handleClosePopupAdmin} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">MAKE ADMIN</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to make this person an administrator?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClosePopupAdmin} color="primary">
                No
              </Button>
              <Button onClick={() => {
                  { this.makeAdmin() };
                  { this.handleClosePopupAdmin() };
                }} color="primary">
                  Yes
              </Button>
            </DialogActions>
          </Dialog>
          </div> 
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
export default withStyles(styles)(connect(mapStateToProps)(AdminVolunteerPage))