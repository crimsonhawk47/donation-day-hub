import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography, createMuiTheme } from '@material-ui/core'
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
    // color: green[400],
    // '&$checked' : {
    //   color:green[600],
    // }
  }
});

const theme = createMuiTheme({
  palette: {
    tertiary:{
      main: 'green[400]'
    }
  }
})

class ShoppingList extends Component {

  state = {
    client_id: this.props.client_id,
    team_id: this.props.team_id,
    item_name: '',
    purchased: 'false'
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_ITEM_LIST',
      payload: this.state.client_id,
    })
  }

  handleCheck = () => {
    console.log(`we checking stuff off`);

  }

  render() {
    const { classes } = this.props;
    console.log(`we in shopping list`, this.props.client_id, this.props.team_id);

    return (
      <>
        <TableContainer><Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                {/* <Checkbox 
                onChange={this.handleCheck} 
                color="tertiary"
                /> */}
              </TableCell>
              <TableCell >
                {/* Item and Item Description */}
              </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {/* {JSON.stringify(this.props.reduxStore.shoppingListReducer)} */}
              {this.props.reduxStore.shoppingListReducer.map((item) => {
                return (
                  <ShoppingItem
                    id={item.id}
                    key={item.id}
                    item={item.name}
                    team={item.team_id}
                    purchased={item.purchased}
                    client={item.client_id}
                  />
                )
              })}

            </TableBody>
          </Table>
        </TableContainer>
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