import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import red from '@material-ui/core/colors/red';
import EditListItem from '../EditListItem/EditListItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#283748',
    },
    secondary: red,
  }
})

class ShoppingItem extends Component {

    state = {
      client_id: this.props.client,
      item: this.props.id,
      open: false,
      setOpen: false,
      id: this.props.id
    }

  handleCheck = () => {
    console.log(`we checking boxes for`, this.props.id);
    this.props.dispatch({
      type: 'TOGGLE_CHECK',
      payload: this.state
    })
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

   // Popup open and close
   handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClosePopup = () => {
    this.setState({ open: false });
  };

  render() {

    return (
      <ThemeProvider theme={theme}>
        <TableRow>
          <TableCell><Checkbox onChange={this.handleCheck} checked={this.props.purchased}/></TableCell>
          <TableCell key={this.props.id}>{this.props.item}</TableCell>
          <TableCell>
            {/* <Fab
              variant='contained'
              color="primary"
              size="small"
              onClick={this.handleEdit}
            >
              <EditIcon fontSize="small" />
            </Fab> */}
            <EditListItem id={this.props.id} name={this.props.item} client_id={this.state.client_id}/>
          </TableCell>
          <TableCell>
            <Fab
              variant="contained"
              color="secondary"
              size="small"
              onClick={this.handleClickOpen}
            >
              <DeleteIcon fontSize="small" />
            </Fab>
            </TableCell>
            <div>
            <Dialog open={this.state.open} onClose={this.handleClosePopup} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">DELETE ITEM</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this item?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClosePopup} color="primary">
                No
              </Button>
              <Button onClick={() => {
                { this.handleDelete() };
                { this.handleClosePopup() };
              }} color="primary">
                Yes
              </Button>
            </DialogActions>
            </Dialog>
            </div>

        </TableRow>
      </ThemeProvider>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default (connect(mapStateToProps)(ShoppingItem))