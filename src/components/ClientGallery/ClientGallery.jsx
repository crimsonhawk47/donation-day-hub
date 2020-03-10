import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography, Input, Button } from '@material-ui/core'


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
    this.setState({ selectedImage })
  }

  uploadFile = () => {
    this.props.dispatch({ type: 'UPLOAD_TO_AWS', payload: this.state.selectedImage })
  }

  displayAllImages = () => {
    this.props.dispatch({type: 'DISPLAY_ALL_IMAGES'})
    
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
        <Input
          id='upload-image'
          type='file'
          accept='image/*'
          onChange={this.getImage}
        />
        {/* Let's replace this with Material UI later */}
          <Button onClick={this.uploadFile}>Upload</Button>
          <Button onClick={this.displayAllImages}>DisplayAllImages</Button>
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