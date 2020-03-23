import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CloseTeamDialog from '../CloseTeamDialog/CloseTeamDialog'
import AdminClientListForTeam from '../AdminClientListForTeam/AdminClientListForTeam'
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
      type: 'FETCH_TEAM_LIST'
    })
    this.props.dispatch({
      type: 'ADMIN_FETCH_TEAM_INFO',
      payload: this.props.match.params.id
    })

  }

  render() {
    const { classes } = this.props;
    const teamMembers = this.props.reduxStore.adminTeamInfo;
    const teamId = this.props.match.params.id
    const team = this.props.reduxStore.adminTeamList.filter(team => team.id === Number(teamId))[0]

    return (
      <ThemeProvider theme={theme}>
        {/* {team && !team.is_archived ?
          <Grid justify='center' container>
            <CloseTeamDialog agreeFunction={() => { this.closeTeam(team.id) }} teamId={team.id} />
          </Grid>
          :
          <></>} */}
        <Paper className={classes.root}>
          {team ?
            <div className="admin-team-page">
              <h1>Team {team.captain_name}</h1>
              {/* <h2>{team.captain_name}</h2> */}
              <div>
                {teamMembers.map(member => (
                  <div>
                    <p>{member.access_level === 2 ? `Captain ` : false}{member.first_name} {member.last_name}</p>
                  </div>
                ))}

              </div>

            </div>
            : <></>
          }
        </Paper>
        <AdminClientListForTeam />
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