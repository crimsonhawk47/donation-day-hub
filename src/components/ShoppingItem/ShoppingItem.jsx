import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


class ShoppingItem extends Component {

  state = {
    client_id: this.props.client,
    item: this.props.id
  }

  handleCheck = () => {
    console.log(`we checking boxes for`, this.props.id);
    this.props.dispatch({
      type: 'TOGGLE_CHECK',
      payload: this.props.id
    })
  }

  handleEdit = () => {
    console.log(`edit clicked for`, this.props.id);

  }

  handleDelete = () => {
    console.log(`delete clicked for`, this.state);
    // this.setState({
    //   item: this.props.id
    // })
    this.props.dispatch({
      type: 'DELETE_ITEM',
      payload: this.state
    })
  }

  render() {


    return (
      <>
        <TableRow>
          <TableCell><Checkbox onClick={this.handleCheck} /></TableCell>
          <TableCell key={this.props.id}>{this.props.item}</TableCell>
          <TableCell><Button
            variant='contained'
            color="primary"
            onClick={this.handleEdit}
          >Edit</Button></TableCell>
          <TableCell><Button
            variant="contained"
            color="secondary"
            onClick={this.handleDelete}
          >Delete</Button></TableCell>

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
export default (connect(mapStateToProps)(ShoppingItem))