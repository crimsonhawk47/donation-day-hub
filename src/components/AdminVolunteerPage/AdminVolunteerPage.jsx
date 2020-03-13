import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'

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

  render() {
    // const { classes } = this.props;

    let volunteer = this.props.reduxStore.adminVolunteerInfo


    return (
      <div>
        <h1>{volunteer.first_name} {volunteer.last_name}</h1>
        <h3>Make captain?</h3>
        <p>Username: {volunteer.username}</p>
        <p>Member since: {moment(volunteer.date_registered).format('LL')}</p>
        <p>{volunteer.email}</p>
        <p>{volunteer.phone}</p>
        <p>{volunteer.street_address}</p>
        <p>{volunteer.city}, {volunteer.state} {volunteer.zip}</p>


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