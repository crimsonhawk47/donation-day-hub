import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import ShoppingList from '../ShoppingList/ShoppingList'


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

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;
    const {client_id, team_id} = this.state
console.log(client_id, team_id);

    return (
      <>

      <Grid container className={classes.root}>
        <Typography >
          {this.props.match.params.name}'s Shopping List
                </Typography>
                <ShoppingList client_id={client_id} team_id={team_id}/>
      </Grid>
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