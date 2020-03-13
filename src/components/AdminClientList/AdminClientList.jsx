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

class AdminClientList extends Component {

  state = {
    search: '',
    client: [],
    backIcon: false
  }

  componentDidMount() {
    this.getClientList();
  }

  getClientList = () => {
    this.props.dispatch({ type: 'FETCH_CLIENT_LIST' });
  }

  searchBar = (event) => {
    this.setState({
      ...this.state,
      search: event.target.value
    }, () => {
      console.log(this.state);

    })
  }

  // Need a handle client click function here

  render() {
    const { classes } = this.props;

    let clients = this.props.reduxStore.adminClientList
    let filteredClients = []
      
    if (clients) {
      filteredClients = clients.filter(
        (client) => {
          return client.name.toLowerCase().indexOf(
            this.state.search.toLowerCase()) !== -1;
        }
      );
    }

    return (
      <Paper className={classes.root}>
        <TextField
          id="outlined-search"
          label="Search Clients"
          type="search"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={(event) => this.searchBar(event)}
        />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="left">Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map(client => {
              return (
              <TableRow key={client.id}>
                <TableCell component="th" scope="row">
                  {moment(client.date).format('LL')}
                </TableCell>
                <TableCell align="left">{client.name}</TableCell>
              </TableRow>
              )
            })}
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
