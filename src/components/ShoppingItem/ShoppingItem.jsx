import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


class ShoppingItem extends Component {

  

  render() {

    return (
<>
<TableRow>
  <TableCell></TableCell>
  <TableCell key={this.props.id}>{this.props.item}</TableCell>
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