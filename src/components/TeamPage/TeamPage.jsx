import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'


class TeamPage extends Component {
  state = {
    teamID: 1
  }
  

  componentDidMount () {
    this.props.dispatch ({
      type: 'FETCH_TEAM',
      payload: this.state.teamID
    })
  
  this.props.dispatch ({
    type: 'FETCH_CLIENTS_BY_TEAM',
    payload: this.state.teamID
  })
}

  handleAdd = () => {
    console.log(`we trying to add clients`);
    
  }

  render() {
    return (
<>
<h1>
  Team {this.props.reduxStore.teamById.captain_name}
</h1>
<Button
variant="contained" 
color="primary" 
onClick={this.handleAdd}>Add Client</Button>

</>
    )
}
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles()(connect(mapStateToProps)(TeamPage))