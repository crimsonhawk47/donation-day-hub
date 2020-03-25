import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import '../App/App.css'
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import red from '@material-ui/core/colors/red'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6d89b1'
    },
    secondary: red
  }
})

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
});

class EditUser extends Component {
  state = {
    firstName: this.props.reduxStore.user.first_name,
    lastName: this.props.reduxStore.user.last_name,
    email: this.props.reduxStore.user.email,
    phone: this.props.reduxStore.user.phone,
    streetAddress: this.props.reduxStore.user.street_address,
    city: this.props.reduxStore.user.city,
    state: this.props.reduxStore.user.state,
    zip: this.props.reduxStore.user.zip,
    open: false
  };

  // Update local state as user inputs data
  editProfile = (event, propertyValue) => {
    //build a new object in state
    this.setState({
      ...this.state,
      [propertyValue]: event.target.value,
    })
  };


  //PUT/UPDATE route
  //dispatches edit to redux
  //needs to save info and return to user dashboard
  handleSaveEdit = () => {
    // start the PUT route for edits
    this.props.dispatch({
      type: 'UPDATE_USER',
      payload: this.state,
    })
    this.props.history.push('/home')
  };


  // Cancel changes and return to user dashboard
  handleCancel = () => {
    this.props.history.push('/home')
  };

  // Popup open and close
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClosePopup = () => {
    this.setState({ open: false });
  };


  render() {
    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <div className="edit-user">
            <h1 className="edit-profile">Edit Profile</h1>
        First Name:
        <br />
            <TextField
              id="standard-name"
              variant="outlined"
              margin="dense"
              style={{ width: 300 }}
              value={this.state.firstName}
              onChange={(event) => this.editProfile(event, 'firstName')}
            />
            <br />
            <br />
        Last Name:
        <br />
            <TextField
              id="standard-name"
              variant="outlined"
              margin="dense"
              style={{ width: 300 }}
              value={this.state.lastName}
              onChange={(event) => this.editProfile(event, 'lastName')}
            />
            <br />
            <br />
        Email:
        <br />
            <TextField
              id="standard-name"
              variant="outlined"
              margin="dense"
              style={{ width: 300 }}
              value={this.state.email}
              onChange={(event) => this.editProfile(event, 'email')}
            />
            <br />
            <br />
        Phone:
        <br />
            <TextField
              id="standard-name"
              variant="outlined"
              margin="dense"
              style={{ width: 300 }}
              value={this.state.phone}
              onChange={(event) => this.editProfile(event, 'phone')}
            />
            <br />
            <br />
        Street Address:
        <br />
            <TextField
              id="standard-name"
              variant="outlined"
              margin="dense"
              style={{ width: 300 }}
              value={this.state.streetAddress}
              onChange={(event) => this.editProfile(event, 'streetAddress')}
            />
            <br />
            <br />
        City:
        <br />
            <TextField
              id="standard-name"
              variant="outlined"
              margin="dense"
              style={{ width: 300 }}
              value={this.state.city}
              onChange={(event) => this.editProfile(event, 'city')}
            />
            <br />
            <br />
        State:
        <br />
            <TextField
              id="standard-name"
              variant="outlined"
              margin="dense"
              style={{ width: 300 }}
              value={this.state.state}
              onChange={(event) => this.editProfile(event, 'state')}
            />
            <br />
            <br />
        Zip:
        <br />
            <TextField
              id="standard-name"
              variant="outlined"
              margin="dense"
              style={{ width: 300 }}
              value={this.state.zip}
              onChange={(event) => this.editProfile(event, 'zip')}
            />
            <br />
            <br />
            <div className="edit-user-cancel">
              <Fab
                type="button"
                className="link-button"
                variant="extended"
                size="small"
                color="secondary"
                onClick={this.handleCancel}>
                Cancel
        </Fab>
            </div>
            <div className="edit-user-save">
              <Fab
                type="button"
                className="link-button"
                variant="extended"
                size="small"
                color="primary"
                onClick={this.handleClickOpen}>
                Save
          </Fab>
            </div>
            {/* POPUP AFTER SAVE BUTTON SELECTED */}
            <div>
              <Dialog open={this.state.open} onClose={this.handleClosePopup} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">SAVE CHANGES</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to save these changes?
              </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClosePopup} color="primary">
                    Cancel
              </Button>
                  <Button onClick={this.handleSaveEdit} color="primary">
                    Save
              </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </Paper>
      </ThemeProvider>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(EditUser)))