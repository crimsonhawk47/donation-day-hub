import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'

const styles = theme=> ({
  root: {
    flexGrow: 1,
  }
});

class AdminVolunteerPage extends Component {

  render() {
    // const { classes } = this.props;

    return (
      <div>
        <h1>Volunteer Page</h1>
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