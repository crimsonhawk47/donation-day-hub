import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase'
import Switch from '@material-ui/core/Switch'

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

// Need to change these to class component functions for SWITCH to work here

// function Switches() {
//   const [state, setState] = React.useState({
//     checkedA: true,
//     checkedB: true,
//   });

// const handleChange = name => event => {
//   this.setState({ ...state, [name]: event.target.checked });
// };

class AdminVolunteerList extends Component {

  state = {
    search: '',
    volunteer: [],
    backIcon: false,
    open: false
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_VOLUNTEER_LIST' });
  }

  searchBar = (event) => {
    this.setState({
      ...this.state,
      search: event.target.value
    }, () => {
      console.log(this.state);

    })
  }

  handleVolunteerClick = (id) => {
    this.props.history.push(`/admin-volunteer-page/${id}`)
  }


  render() {
    const { classes } = this.props;

    let volunteers = this.props.reduxStore.adminVolunteerList
    let filteredVolunteers = []
      
    if (volunteers) {
      filteredVolunteers = volunteers.filter(
        (volunteer) => {
          const fullName = volunteer.first_name + ' ' + volunteer.last_name
          return fullName.toLowerCase().indexOf(
            this.state.search.toLowerCase()) !== -1;
        }
      ).filter(volunteer => volunteer.access_level !== 3);
    }

    return (
      <>
      <Paper className={classes.root}>
        <TextField
          id="outlined-search"
          label="Search Volunteers"
          type="search"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={(event) => this.searchBar(event)}
        />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell><b>Date</b></TableCell>
              <TableCell align="left"><b>Name</b></TableCell>
              <TableCell align="left"><b>Team Status</b></TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
          {filteredVolunteers.map(volunteer => {
              return (
              <TableRow 
              key={volunteer.id}
              onClick={() => this.handleVolunteerClick(volunteer.id)}>
                <TableCell component="th" scope="row">
                  {moment(volunteer.date).format('LL')}
                </TableCell>
                <TableCell align="left">{volunteer.first_name} {volunteer.last_name}</TableCell>
                  {volunteer.active_team ?
                    volunteer.access_level === 2 ?
                      <TableCell align="left">Captain</TableCell>
                      :
                      <TableCell align="left">Member</TableCell>
                    :
                    <TableCell align="left">No Team</TableCell>}
                 
              </TableRow>
              )
            })}
          </TableBody>
          
        </Table>
      </Paper>
      </>
    );
  }
}

AdminVolunteerList.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}

export default withStyles(styles)(withRouter(connect(mapStateToProps)(AdminVolunteerList)))
