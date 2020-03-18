import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


class ShoppingItem extends Component {


  handleCheck = () => {
    console.log(`we checking boxes for`, this.props.id);

  }

  handleEdit = () => {
    console.log(`edit clicked for`, this.props.id);
    
  }

  handleDelete = () => {
    console.log(`delete clicked for`, this.props.id);
    
  }

  render() {


    return (
<>
<TableRow>
  <TableCell><Checkbox onClick={this.handleCheck}/></TableCell>
  <TableCell key={this.props.id}>{this.props.item}</TableCell>
  <TableCell><Button 
    variant='contained' 
    color="primary"
    onClick={this.handleEdit}
    >Edit</Button></TableCell>
  <TableCell><Button variant="contained" color="secondary">Delete</Button></TableCell>

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