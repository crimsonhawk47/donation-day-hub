import React, { Component } from 'react';
import { connect, useDispatch,  useSelector } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CloseTeamDialog from '../CloseTeamDialog/CloseTeamDialog'
import AdminClientListForTeam from '../AdminClientListForTeam/AdminClientListForTeam'
import '../App/App.css'
import { useEffect } from 'react';

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

const AdminTeamPage = (props) => {
  // componentDidMount() {
  //   props.dispatch({
  //     type: 'FETCH_TEAM_LIST'
  //   })
  //   props.dispatch({
  //     type: 'ADMIN_FETCH_TEAM_INFO',
  //     payload: props.match.params.id
  //   })
  // }
  const dispatch = useDispatch()
  const reduxStore = useSelector(state => state)


  useEffect(() => {
    
    dispatch({
      type: 'FETCH_TEAM_LIST'
    })
    dispatch({
      type: 'ADMIN_FETCH_TEAM_INFO',
      payload: props.match.params.id
    })
  }, [props.match.params.id])
  {
    const { classes } = props;
    const teamMembers = reduxStore.adminTeamInfo;
    const teamId = props.match.params.id
    const team = reduxStore.adminTeamList.filter(team => team.id === Number(teamId))[0]

    return (
      <ThemeProvider theme={theme}>
        {/* {team && !team.is_archived ?
          <Grid justify='center' container>
            <CloseTeamDialog agreeFunction={() => { closeTeam(team.id) }} teamId={team.id} />
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


export default withStyles(styles)(AdminTeamPage)