import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const moment = require('moment');

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class AdminVolunteerPage extends Component {
  state = {
    open: false
  }


  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_VOLUNTEER_INFO',
      payload: this.props.match.params.id
    })
  }

  makeCaptain = () => {
    this.props.dispatch({
      type: 'ADMIN_MAKE_CAPTAIN',
      payload: this.props.reduxStore.adminVolunteerInfo
    })
  }

  goToTeam = () => {
    const currentVolunteerId = this.props.reduxStore.adminVolunteerInfo.active_team
    this.props.history.push(`/admin-team-page/${currentVolunteerId}`)
    
  }

   // Popup open and close
   handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClosePopup = () => {
    this.setState({ open: false });
  };

  render() {
    // const { classes } = this.props;

    let volunteer = this.props.reduxStore.adminVolunteerInfo;


    return (
      <div>
        <h1>{volunteer.first_name} {volunteer.last_name}</h1>
        {volunteer.access_level === 2 || volunteer.active_team ?
          <></>
          :
          <Button variant="contained" onClick={this.handleClickOpen}>Make Captain</Button>}
        {volunteer.active_team ?
          <Button variant="contained" onClick={this.goToTeam}>Go To Team</Button>
          :
          <></>
        }
        {/* POPUP AFTER MAKE CAPTAIN BUTTON SELECTED */}
        <div>
          <Dialog open={this.state.open} onClose={this.handleClosePopup} aria-labelledby="form-dialog-title">
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
            <Button onClick={ () => {
              {this.makeCaptain()};
              {this.handleClosePopup()};
            }} color="primary">
            {/* // {this.makeCaptain} color="primary"> */}
              Yes
            </Button>
          </DialogActions>
          </Dialog>
        </div>

        <p>Username: {volunteer.username}</p>
        <p>Member since: {moment(volunteer.date_registered).format('LL')}</p>
        <p>{volunteer.email}</p>
        <p>{volunteer.phone}</p>
        <p>
          {volunteer.street_address}
          <br />
          {volunteer.city}, {volunteer.state} {volunteer.zip}
        </p>


      </div>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles(styles)(connect(mapStateToProps)(AdminVolunteerPage))