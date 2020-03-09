import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'


const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class ClientGallery extends Component {

  state = {
    selectedImage: ''
  }


  render() {
    const { classes } = this.props;
    console.log(this.state);
    

    return (
      <>
        <Grid container className={classes.root}>
          <Typography >
            I am a ClientGallery Component
        </Typography>
        </Grid>
        {JSON.stringify(this.props.reduxStore)}
      </>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles(styles)(connect(mapStateToProps)(ClientGallery))