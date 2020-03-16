import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'



const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class CloseTeamDalog extends Component {

  handleClickOpen = () => {
    this.props.dispatch({type: 'SET_CLOSE_TEAM_DIALOG'})

  };

  handleClose = () => {
    this.props.dispatch({type: 'SET_CLOSE_TEAM_DIALOG'})
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open alert dialog
        </Button>
        <Dialog
          open={this.props.reduxStore.dialogReducer && this.props.reduxStore.dialogReducer.closeTeamDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
          </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
          </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles(styles)(connect(mapStateToProps)(CloseTeamDalog))