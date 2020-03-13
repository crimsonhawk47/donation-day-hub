import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography, Button } from '@material-ui/core'

const moment = require('moment');

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class AdminVolunteerPage extends Component {
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
    
  }

  render() {
    // const { classes } = this.props;

    let volunteer = this.props.reduxStore.adminVolunteerInfo;


    return (
      <div>
        <h1>{volunteer.first_name} {volunteer.last_name}</h1>
        {this.props.reduxStore.adminVolunteerInfo.access_level === 2 ?
          <></>
          :
          <Button variant="contained" onClick={this.makeCaptain}>Make Captain</Button>}
        <Button variant="contained" onClick={this.goToTeam}>Go To Team</Button>
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