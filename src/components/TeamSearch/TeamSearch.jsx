import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import TeamSuggestions from '../TeamSuggestions/TeamSuggestions'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class TeamSearch extends Component {


  state = {
    search: '',
    team: [],
    backIcon: false,
    open: false
  }

  componentDidMount() {
    this.getTeams();
  }

  getTeams = () => {
    this.props.dispatch({ type: 'FETCH_SEARCH_TEAMS' });
  }

  searchBar = (event) => {
    this.setState({
      ...this.state,
      search: event.target.value
    }, () => {
      console.log(this.state);

    })
  }

  handleClick = (id) => {
    this.props.dispatch({ type: 'JOIN_TEAM', payload: {id: id, history: this.props.history} })
  }

  // Popup open and close
  handleClickOpen = (teamId) => {
    this.setState({ open: teamId });
  };

  handleClosePopup = () => {
    this.setState({ open: false });
  };

  render() {
    let teams = this.props.reduxStore.teamReducer
    let filteredTeams = []

    if (teams) {
      filteredTeams = teams.filter(
        (team) => {
          return team.captain_name.toLowerCase().indexOf(
            this.state.search.toLowerCase()) !== -1;
        }
      );
    }

    return (
      <>
        <div className="SearchBar">
          <input className="Search" placeholder="Search Bar" onChange={(event) => this.searchBar(event)} />
        </div>
        <div className="Results">
          {filteredTeams.map(team => {
            return (
              <div className="SearchTeamShow" key={team.id} >
                <div className="displayNameSearch">
                  <h3 className="SearchTeamName">{team.captain_name}</h3>
                  <button onClick={() => {this.handleClickOpen(team.id)}}>Join</button>
                  <div>
                    <Dialog open={this.state.open === team.id} onClose={this.handleClosePopup} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">JOIN TEAM</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Are you sure you want to join {team.captain_name}'s team?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClosePopup} color="primary">
                        No
                      </Button>
                      <Button onClick={() => this.handleClick(team.id)} color="primary">
                        Yes
                      </Button>
                    </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </>
    )
  }

}


const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}

export default withRouter(connect(mapStateToProps)(TeamSearch))