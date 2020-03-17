import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography, Button } from '@material-ui/core'
import ShoppingList from '../ShoppingList/ShoppingList'
import TextField from '@material-ui/core/TextField';


const styles = theme=> ({
  root: {
    flexGrow: 1,
  }
});


class ClientPage extends Component {

  state = {
    client_id: this.props.match.params.id,
    team_id: this.props.match.params.teamId,
  }

  goToMedia = (clientId) => {
    this.props.history.push(`/client-gallery/${clientId}`)
  }

  render() {
    const { classes } = this.props;
    const {client_id, team_id} = this.state
console.log(client_id, team_id);

    return (
      <>

                <h3>Items Requested</h3> 
                <h4>Item and description</h4>
                <TextField 
                variant="outlined" 
                fullWidth 
                placeholder='Add Item'/>
                <Button  variant='contained'>Click To Add</Button>
                <ShoppingList client_id={client_id} team_id={team_id}/>

      <Button variant="outlined" onClick={() => {this.goToMedia(client_id)}}>Media</Button>
      </>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles(styles)(connect(mapStateToProps)(ClientPage))