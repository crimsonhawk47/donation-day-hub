import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withRouter } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

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
    quaternary: {
      main: '#f6f6f6'
    }
  }
})

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class ClientList extends Component {

  handleView = () => {
    console.log('button clicked', this.props.id);
    this.props.history.push(`/client-page/${this.props.id}/${this.props.reduxStore.teamById.team_id}/${this.props.name}`)
  }

  render() {
    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <TableRow>
          <TableCell key={this.props.id}>{this.props.name}</TableCell>
          <TableCell>
            <Fab 
              size="small"
              color="secondary"
              aria-label="Add"
              variant="extended"
              onClick={this.handleView} 
            >View Client</Fab>
          </TableCell>
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
export default withStyles(styles)(withRouter(connect(mapStateToProps)(ClientList)))