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

class AdminTeamPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'ADMIN_FETCH_TEAM_INFO',
      payload: this.props.match.params.id
    })
  }

  render() {
    // const { classes } = this.props;
    let team = this.props.reduxStore.adminTeamInfo;

    return (
      <div>
        <h1>Team Page</h1>
        {/* <h2>{team.captain_name}</h2> */}
        <div>
          {team.map(team => (
          <div>
          <p>{team.first_name} {team.last_name}</p>
            </div>
        ))}

        </div>

      </div>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles(styles)(connect(mapStateToProps)(AdminTeamPage))