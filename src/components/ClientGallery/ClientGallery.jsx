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

class ClientGallery extends Component {

  state = {
    selectedFile: '',
    clientId: this.props.match.params.clientId
  }

  componentDidMount() {
    this.props.dispatch({ type: 'GET_IMAGE_NAMES', payload: this.state.clientId })
  }

  setFile = (event) => {
    let selectedFile = event.target.files[0]
    this.setState({ selectedFile })
  }

  uploadFile = () => {
    this.props.dispatch({
      type: 'UPLOAD_TO_AWS',
      payload: { file: this.state.selectedFile, client_id: this.state.clientId }
    })
  }

  displayAllFiles = () => {
    this.props.dispatch({ type: 'GET_IMAGE_NAMES', payload: this.state.clientId })
  }

  render() {
    console.log(this.state.clientId);
    console.log(this.props.match);
    

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
          {this.props.media.map((file, index) => {
            if (file.type.split('/')[0] == 'video') {
              return (
                  <video width="320" height="240" controls>
                    <source src={file.link} type={file.type} />
                      Your browser does not support the video tag.
                    </video>
              )
            }
            else{
              return <img
              className={classes.clientMedia}
              key={index}
              src={file.link} />
            }
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