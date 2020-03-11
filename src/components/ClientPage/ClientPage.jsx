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

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Typography >
          I am a ClientPage Component
                </Typography>
                <ShoppingList />
      </Grid>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles(styles)(connect(mapStateToProps)(ClientPage))