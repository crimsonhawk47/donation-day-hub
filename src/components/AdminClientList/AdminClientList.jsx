import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography, Button } from '@material-ui/core'


const styles = theme=> ({
  root: {
    flexGrow: 1,
  }
});



class AdminClientList extends Component {

    handleClientClick = () => {
        console.log('clicking to Client View');
        this.props.history.push(`/admin-client-list`)
    }
    
    handleVolunteerClick = () => {
        console.log('clicking to Volunteer View');
        this.props.history.push(`/admin-volunteer-list`)
    }
    
    handleTeamClick = () => {
        console.log('clicking to Team View');
        this.props.history.push(`/admin-team-list`)
    }

  render() {
    const { classes } = this.props;

    return (
      <div container className={classes.root}>
        <h1 >
            Admin Client List View
        </h1>           
        <button 
            onClick={() => this.handleClientClick()}>
            Client List
        </button>  
        <button
            onClick={() => this.handleVolunteerClick()}>
            Volunteer List
        </button>     
        <button
            onClick={() => this.handleTeamClick()}>
            Team List
        </button>     

      </div>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}

export default withStyles(styles)(connect(mapStateToProps)(AdminClientList))
