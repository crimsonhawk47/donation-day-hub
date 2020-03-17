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
    this.props.dispatch({type: 'SET_CLOSE_TEAM_DIALOG', payload: this.props.teamId})

  };

  handleDisagree = () => {
    this.props.dispatch({type: 'SET_CLOSE_TEAM_DIALOG', payload: false})
  };

  handleAgree = () => {
    this.props.agreeFunction(); 
    this.props.dispatch({type: 'SET_CLOSE_TEAM_DIALOG', payload: false})
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Close
        </Button>
        <Dialog
          open={this.props.reduxStore.dialogReducer.closeTeamDialog == this.props.teamId}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Close the Team?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will end the donation day for the group, archive the team, and let everyone join a new team.
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDisagree} color="primary">
              Disagree
          </Button>
            <Button onClick={this.handleAgree} color="primary" autoFocus>
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