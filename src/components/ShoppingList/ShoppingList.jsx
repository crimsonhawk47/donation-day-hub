import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button'
import ShoppingItem from '../ShoppingItem/ShoppingItem'

// reference https://material-ui.com/components/tables/#table
// code for table was taken from here

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class ShoppingList extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_ITEM_LIST'
    })
  }

  handleCheck = () => {
    console.log(`we checking shit off`);

  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Grid container className={classes.root}>
          <Typography >
            I am the ShoppingList Component
        </Typography>

        </Grid>
        <TableContainer><Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox onChange={this.handleCheck} />
              </TableCell>
              <TableCell >
                Item and Item Description
          </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell><ShoppingItem /></TableCell>

            </TableRow>
          </TableBody>
        </Table></TableContainer>
      </>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles(styles)(connect(mapStateToProps)(ShoppingList))