import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import '../App/App.css'

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

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  },
});

class AdminTeamPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'ADMIN_FETCH_TEAM_INFO',
      payload: this.props.match.params.id
    })
  }

  render() {
    const { classes } = this.props;
    let team = this.props.reduxStore.adminTeamInfo;

    return (
      <ThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <div className="admin-team-page">
            <h1>Team Page</h1>
            {/* <h2>{team.captain_name}</h2> */}
            <div>
              {team.map(team => (
                <div>
                  <p>{team.first_name} {team.last_name}</p>
                </div>
              ))}

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
export default withStyles(styles)(connect(mapStateToProps)(AdminTeamPage))