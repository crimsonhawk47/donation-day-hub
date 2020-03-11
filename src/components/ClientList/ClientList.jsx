import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class ClientList extends Component {

  handleEdit = () => {
    console.log('button clicked', this.props.id);

  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <TableRow>
          <TableCell key={this.props.id}>{this.props.name}</TableCell>
          <TableCell><Button onClick={this.handleEdit}>EDIT</Button></TableCell>
        </TableRow>

      </>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles(styles)(connect(mapStateToProps)(ClientList))