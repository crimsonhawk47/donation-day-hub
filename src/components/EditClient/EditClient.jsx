import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


const styles = theme=> ({
  root: {
    flexGrow: 1,
  }
});

class EditClient extends Component {


  componentDidMount() {
      this.props.dispatch({
        type: 'FETCH_SINGLE_CLIENT',
        payload: this.props.id
      })
    
  }

  state = {
    open: false,
    setOpen: false,
    name: '',
    location: '',
    bio: '',
    client_id: '',
    // name: this.props.reduxStore.client.selectSingleClient.name,
    // location: this.props.reduxStore.client.selectSingleClient.location,
    // bio: this.props.reduxStore.client.selectSingleClient.bio,
  }

  handleClickOpen = () => {
    
    this.setState({
      open: true,
      team_id: this.props.reduxStore.teamById.team_id,
      name: this.props.reduxStore.client.selectSingleClient.name,
      location: this.props.reduxStore.client.selectSingleClient.location,
      bio: this.props.reduxStore.client.selectSingleClient.bio,
    })
  };

  handleClose = (id) => {

    if (id === 'edit') {
      this.props.dispatch({
        type: "UPDATE_CLIENT",
        payload: {
          name: this.state.name,
          bio: this.state.bio,
          location: this.state.location,
          team_id: this.state.team_id,
          client_id: this.props.id
        }
      })
      this.setState({
        open: false,
      })      
    } else {
      this.setState({
        open: false
      })
    }
  };

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value
    })
  }

  render() {
    const { classes } = this.props;

    return (
<>
        <EditIcon onClick={this.handleClickOpen}/>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">ADD CLIENT</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="name"
              value={this.state.name}
              fullWidth
              onChange={this.handleInputChangeFor('name')}
            />
            <TextField
              onChange={this.handleInputChangeFor('location')}
              margin="dense"
              id="location"
              label="Location"
              type="location"
              value={this.state.location}
              fullWidth
            />
            <TextField
              onChange={this.handleInputChangeFor('bio')}
              margin="dense"
              id="bio"
              label="Bio"
              type="bio"
              value={this.state.bio}
              fullWidth
              multiline
              rows="4"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => this.handleClose('cancel', e)} color="primary">
              Cancel
              </Button>
            <Button onClick={(e) => this.handleClose('edit', e)} color="primary">
              Update Client
              </Button>
          </DialogActions>
        </Dialog>
</>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles(styles)(connect(mapStateToProps)(EditClient))