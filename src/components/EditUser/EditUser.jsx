import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Popup from 'reactjs-popup'



const styles = theme => ({
  root: {
    flexGrow: 1,
  }
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
    zip: this.props.reduxStore.user.zip
  }

  // Update local state as user inputs data
  editProfile = (event, propertyValue) => {
    //build a new object in state
    //console.log('editing profile', this.state);
    this.setState({
      ...this.state,
      [propertyValue]: event.target.value,
    })
  }


  //PUT/UPDATE route
  //dispatches edit to redux
  //needs to save info and return to user dashboard
  handleSaveEdit =() => {
    console.log('clicked Save button');
    // start the PUT route for edits
    this.props.dispatch({
      type:'UPDATE_USER',
      payload: this.state,
    })
    this.props.history.push('/home')
  }

  
  // Cancel changes and return to user dashboard
  handleCancel = () => {
    //console.log('clicked cancel button');
    this.props.history.push('/home')
  }

  render() {
    return (
      <div>
        <h1>Edit Profile</h1>
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
        <Button
          type="button"
          className="link-button"
          variant="contained"
          color="secondary"
          onClick={this.handleCancel}>
          Cancel
        </Button>
        <Button
          type="button"
          className="link-button"
          variant="contained"
          color="primary"
          onClick={this.handleSaveEdit}>
            Save
          </Button>
          

      </div>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(EditUser)))