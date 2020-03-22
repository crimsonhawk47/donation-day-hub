import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import Fab from '@material-ui/core/Fab';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#283748',
    },
    secondary: {
      main: '#6d89b1'
    },
    tertiary: {
      main: '#808281'
    },
  },
})


class CloseTeamDalog extends Component {

  handleClickOpen = (event) => {
    event.stopPropagation()
    this.props.dispatch({ type: 'SET_CLOSE_TEAM_DIALOG', payload: this.props.teamId })

  };

  handleDisagree = (event) => {
    event.stopPropagation()
    this.props.dispatch({ type: 'SET_CLOSE_TEAM_DIALOG', payload: false })
  };

  handleAgree = (event) => {
    event.stopPropagation()
    this.props.agreeFunction();
    this.props.dispatch({ type: 'SET_CLOSE_TEAM_DIALOG', payload: false })
  };

  render() {
    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Grid container className={classes.root}>
          <Fab 
          variant="outlined" 
          color="secondary" 
          size="small"
          onClick={this.handleClickOpen}>
            Close
        </Fab>
          <Dialog
            open={this.props.reduxStore.dialogReducer.closeTeamDialog == this.props.teamId}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Close the Team?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to close the donation day for the team?
              <br />
                <br />
              This will archive the team and let each team member join a new team.
              <br />
                <br />
                <i><b>This action cannot be undone.</b></i>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDisagree} color="primary">
                Cancel
          </Button>
              <Button onClick={this.handleAgree} color="primary" autoFocus>
                Close Team
          </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </ThemeProvider>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles()(connect(mapStateToProps)(CloseTeamDalog))