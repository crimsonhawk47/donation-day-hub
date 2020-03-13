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

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_VOLUNTEER_LIST' });
  }

  handleVolunteerClick = (id) => {
    this.props.history.push(`/admin-volunteer-page/${id}`)
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <TextField
          id="outlined-search"
          label="Search Volunteers"
          type="search"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Make Captain?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.reduxStore.adminVolunteerList.map(volunteer => (
              <TableRow
                key={volunteer.id}
                onClick={() => this.handleVolunteerClick(volunteer.id)}
              >
                <TableCell component="th" scope="row">
                  {moment(volunteer.date).format('LL')}
                </TableCell>
                <TableCell align="left">{volunteer.first_name} {volunteer.last_name}</TableCell>
                <TableCell align="left">{volunteer.is_archived}
                  {/* Need to play with this for toggle to actually work */}
                  {/* <Switch
                    checked={state.checkedB}
                    onChange={handleChange('checkedB')}
                    value="checkedB"
                    color="primary"
                  /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
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
