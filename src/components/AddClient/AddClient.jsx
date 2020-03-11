import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class AddClient extends Component {

  state = {
    open: false,
    setOpen: false
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };

  render() {

    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          Add Client
      </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">ADD CLIENT</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="name"
              fullWidth
            />
            <TextField
              
              margin="dense"
              id="location"
              label="Location"
              type="location"
              fullWidth
            />            
            <DialogContentText>
              <h4>Tell Me About Your Story:</h4>
              <List>
                <ListItem>Have you always been in MPLS? / where are you from?</ListItem>
                <ListItem>How long have you been without a home? Do you stay in shelters?</ListItem>
                <ListItem>What types of jobs are you good at?</ListItem>
                <ListItem>What are some things you want to do when you get back on your feet?</ListItem>
                <ListItem>What’s something you’d like people to know about you or people experiencing homelessness?</ListItem>
              </List>
          </DialogContentText>
            <TextField
              
              margin="dense"
              id="bio"
              label="Bio"
              type="bio"
              fullWidth
              multiline
              rows="4"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.handleClose} color="primary">
              Add Client
          </Button>
          </DialogActions>
        </Dialog>
      </div>

    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles(styles)(connect(mapStateToProps)(AddClient))