import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import { withRouter } from 'react-router-dom';

const moment = require('moment');

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
});

class AdminTeamList extends Component {

  state = {
    search: '',
    team: [],
    backIcon: false
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_TEAM_LIST' });
  }

  handleTeamClick = (id) => {
    this.props.history.push(`/admin-team-page/${id}`)
  }

  searchBar = (event) => {
    this.setState({
      ...this.state,
      search: event.target.value
    }, () => {
      console.log(this.state);

    })
  }

  // Need a handleTeamClick function here

  render() {
    const { classes } = this.props;
    let teams = this.props.reduxStore.adminTeamList
    let filteredTeams = []
      
    if (teams) {
      filteredTeams = teams.filter(
        (team) => {
          return team.captain_name.toLowerCase().indexOf(
            this.state.search.toLowerCase()) !== -1;
        }
      );
    }

    return (

      <Paper className={classes.root}>
        <TextField
          id="outlined-search"
          label="Search Teams"
          type="search"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={(event) => this.searchBar(event)}
        />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Donation Day</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Close Team?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTeams.map(team => {
              return (
              <TableRow key={team.id}
              onClick={() => this.handleTeamClick(team.id)} >
                <TableCell component="th" scope="row">
                  {moment(team.date).format('LL')}
                </TableCell>
                <TableCell align="left">{team.captain_name}</TableCell>
                <TableCell align="left">{team.is_archived}</TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

AdminTeamList.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}

export default withStyles(styles) (withRouter(connect(mapStateToProps)(AdminTeamList)))
