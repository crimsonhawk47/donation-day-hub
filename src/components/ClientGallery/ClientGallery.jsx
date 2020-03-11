import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography, Input, Button } from '@material-ui/core'


const styles = theme => ({
  clientMedia: {
    maxWidth: '150px',
    maxHeight: '150px'
  }
});

//FOR NOW PRETENDING IT'S CLIENT WITH ID OF 1
const client_id = 1

class ClientGallery extends Component {

  state = {
    selectedFile: ''
  }

  setFile = (event) => {
    let selectedImage = event.target.files[0]
    this.setState({ selectedImage })
  }

  uploadFile = () => {
    this.props.dispatch({
      type: 'UPLOAD_TO_AWS',
      payload: { file: this.state.selectedFile, client_id: client_id }
    })
  }

  displayAllFiles = () => {
    this.props.dispatch({ type: 'GET_IMAGE_NAMES', payload: client_id })
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <h1>Upload an image to AWS S3 bucket</h1>
        <Grid container>
          <Input
            id='upload-image'
            type='file'
            accept='image/*'
            onChange={this.setFile} />
          <Button variant="contained" onClick={this.uploadFile}>Upload</Button>
          <Button variant="contained" onClick={this.displayAllFiles}>DisplayAllImages</Button>
        </Grid>
        <Grid container>
          {this.props.media.map((string, index) => {
            return <img
              className={classes.clientMedia}
              key={index}
              src={string} />
          })}
        </Grid>
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