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
    this.props.dispatch({type: 'GET_IMAGE_NAMES'})
    
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
          {this.props.media.map((string, index) => {
            return <img key={index} src={string} />
          })}
      </>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { media: reduxStore.client.selectedClientMedia }
  )
}
export default withStyles(styles)(connect(mapStateToProps)(ClientGallery))