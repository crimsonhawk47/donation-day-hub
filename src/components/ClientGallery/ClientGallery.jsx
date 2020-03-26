import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../App/App.css'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography, Input, Button } from '@material-ui/core'
import Fab from '@material-ui/core/Fab';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LoadingScreen from '../LoadingScreen/LoadingScreen'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#283748',
    },
    secondary: {
      main: '#6d89b1'
    },
    tertiary: {
      main: '#808281'
    },
  },
})

const styles = theme => ({
  clientMedia: {
    maxWidth: '150px',
    maxHeight: '150px',
    boxShadow: '2px 1px 10px 2px grey'
  },
  clientVideo: {
    boxShadow: '2px 1px 32px 0px grey'
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
    this.props.dispatch({ type: 'SET_LOADING_TRUE' })
    this.props.dispatch({
      type: 'UPLOAD_TO_AWS',
      payload: { file: this.state.selectedFile, client_id: this.state.clientId }
    })
  }

  displayAllFiles = () => {
    this.props.dispatch({ type: 'GET_IMAGE_NAMES', payload: this.state.clientId })
  }

  render() {

    const { classes } = this.props;
    const loading = this.props.loading
    const admin = this.props.admin

    return (
      <ThemeProvider theme={theme}>
        {loading ? <LoadingScreen /> :
          <>

            {admin ? <></> :
              <>
                <h1>Client Gallery</h1>
                <p>1. Click "Choose File" to select receipts, images of clients, and videos to upload.
          <br />
          2. Then click "Upload" to save them.</p>
                <br />
                <div className="upload-btn">
                  <Grid container>
                    <Input
                      id='upload-image'
                      type='file'
                      accept='image/*'
                      onChange={this.setFile} />
                    <Fab variant="extended" color="secondary" size="small" onClick={this.uploadFile}>Upload</Fab>
                  </Grid>
                </div>
              </>
            }


            <Grid container spacing={3}>
              {this.props.media.map((file, index) => {
                if (file.type.split('/')[0] == 'video') {
                  return (
                    <Paper>
                      <Grid item>
                        <video width="320" height="240" controls className={classes.clientVideo}>
                          <source src={file.link} type={file.type} />
                        </video>
                      </Grid>
                    </Paper>

                  )
                }
                else {
                  return (
                    <Grid item>
                      <img
                        className={classes.clientMedia}
                        key={index}
                        src={file.link} />
                    </Grid>
                  )
                }
              })}
            </Grid>
          </>
        }
      </ThemeProvider>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    {
      media: reduxStore.client.selectedClientMedia,
      loading: reduxStore.loading,
      admin: reduxStore.user.access_level === 3
    }
  )
}
export default withStyles(styles)(connect(mapStateToProps)(ClientGallery))