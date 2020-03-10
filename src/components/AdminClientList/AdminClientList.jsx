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

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(date, name) {
  id += 1;
  return { id, date, name };
}

const rows = [
  createData('2-20-20', 'Gerry'),
  createData('3-5-20', 'Jimmy'),
  createData('4-2-20', 'JoeBob'),
  createData('2-4-20', 'SallyMae'),
  createData('1-25-20', 'Carrie'),
];

class AdminClientList extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <TextField
          id="outlined-search"
          label="Search Clients"
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

AdminClientList.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}

export default withStyles(styles)(connect(mapStateToProps)(AdminClientList))
