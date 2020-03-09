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


  getImage = (event) => {
    let selectedImage = event.target.files[0]
    this.setState({selectedImage})
  }

  uploadFile = (event) => {
    this.props.dispatch({type: 'UPLOAD_TO_AWS', payload: this.state.selectedImage})
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

        <h1>Upload an image to AWS S3 bucket</h1>
        <input
          id='upload-image'
          type='file'
          accept='image/*'
          onChange={this.getImage}
        />
        <form onSubmit={this.uploadFile}>
          <button id='file-upload-button'>Upload</button>
        </form>
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