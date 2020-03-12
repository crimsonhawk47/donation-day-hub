import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import TeamSuggestions from '../TeamSuggestions/TeamSuggestions'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'


const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class TeamSearch extends Component {

  // state = {
  //   query: '',
  //   results: []
  // }

  //   getInfo = () => {
  //     axios.get(`/api/team`)
  //       .then(({ data }) => {
  //         this.setState({
  //           results: data.data
  //         })
  //       })
  //   }

  //   handleInputChange = () => {
  //     this.setState({
  //       query: this.search.value
  //     }, () => {
  //       if (this.state.query && this.state.query.length > 1) {
  //         if (this.state.query.length % 2 === 0) {
  //           this.getInfo()
  //         }
  //       } else if (!this.state.query) {
  //       }
  //     })
  //   }

  //   render() {
  //     return (
  //       <form>
  //         <input
  //           placeholder="Search for..."
  //           ref={input => this.search = input}
  //           onChange={this.handleInputChange}
  //         />
  //         <TeamSuggestions results={this.state.results} />
  //       </form>
  //     )
  //   }

  state = {
    search: '',
    team: [],
    backIcon: false
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
                  <button onClick={this.joinTeam} onClick={() => this.handleClick(team.id)}>Join</button>

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