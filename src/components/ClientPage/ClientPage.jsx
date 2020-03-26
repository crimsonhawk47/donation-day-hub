import React, { Component } from 'react';
import '../App/App.css'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { Paper, Grid, Typography, Button, Box } from '@material-ui/core'
import ShoppingList from '../ShoppingList/ShoppingList'
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ClientChat from '../ClientChat/ClientChat'
import EditClient from '../EditClient/EditClient'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
  root: {
    flexGrow: 1,
  },
})

class ClientPage extends Component {

  state = {
    name: '',
    client_id: this.props.match.params.id,
    team_id: this.props.match.params.teamId,
    purchased: false,
    comment: this.props.reduxStore.clientsByTeamId
  }

  componentDidMount() {
    this.props.dispatch({ type: 'GET_COMMENT', payload: Number(this.props.match.params.id) })
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'SET_COMMENT', payload: '' })
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_SINGLE_CLIENT',
      payload: this.state.client_id
    })

  }

  handleAddItem = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleComment = (event) => {
    this.props.dispatch({
      type: 'SET_COMMENT',
      payload: event.target.value
    })
  }

  submitComment = () => {
    this.props.dispatch({
      type: 'UPDATE_COMMENT',
      payload: { id: this.props.match.params.id, comment: this.props.reduxStore.client.comment }
    })
  }

  handleSubmit = () => {
    if (this.state.name === '') {
      alert("Please add and item and description!")
    } else {
      this.props.dispatch({
        type: 'ADD_ITEM',
        payload: this.state
      })
      this.setState({
        name: ''
      })
    }
  }

  goToMedia = (clientId) => {
    this.props.history.push(`/client-gallery/${clientId}`)
  }

  render() {
    const { classes } = this.props;
    const { client_id, team_id } = this.state
    const comment = this.props.reduxStore.client.comment
    const user = this.props.reduxStore.user
    const admin = user.access_level === 3

    return (
      <ThemeProvider theme={theme} classes={classes.root} >
        <Grid container alignItems='center'>
          <Grid item xs={11} container alignItems='center' spacing={1}>
            <Grid item>
              <h1>
                {this.props.reduxStore.client.selectSingleClient.name}
              </h1>
            </Grid>
            {admin ? <></> :
              <Grid item>
                <EditClient id={this.props.match.params.id} />
              </Grid>
            }
          </Grid>
          <Grid item xs={1} container justify='flex-end'>
            <Fab
              variant="outlined"
              color="primary"
              onClick={() => { this.goToMedia(client_id) }}>
              <PhotoCamera />
            </Fab>
          </Grid>

        </Grid>
        <br />

        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography >Bio</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {this.props.reduxStore.client.selectSingleClient.bio}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br />
        <h3>Shopping List</h3>
        {/* <h4>Item Description</h4> */}
        {admin ? <></> :
          <Grid container>
            <Grid item xs={9}>
              <Box marginRight={3}>
                <TextField
                  onChange={this.handleAddItem}
                  variant="outlined"
                  fullWidth
                  placeholder='Item Description'
                  value={this.state.name} />
              </Box>
            </Grid>
            <Grid item xs={3} container alignItems='center'>
              <Fab
                onClick={this.handleSubmit}
                variant="extended"
                color="secondary"
                size="small"
              >
                Add Item
          </Fab>
            </Grid>
          </Grid>
        }
        <ShoppingList client_id={client_id} team_id={team_id} />
        {/* <br />
        <br /> */}
        <h2>Comments</h2>
        <p>Enter comments/questions about shopping list items here:</p>
        <Box marginBottom={2}>

          <Grid container className='comment'>
            <TextField
              onChange={this.handleComment}
              variant="outlined"
              fullWidth
              multiline
              placeholder='Comments'
              value={comment} />

          </Grid>
        </Box>
        {admin ? <></> :
          <Fab
            variant="extended"
            color="secondary"
            size="small"
            onClick={this.submitComment}>
            Submit Comment
            </Fab>
        }
        {/* <ClientChat clientId={client_id} team_id={team_id} /> */}
      </ThemeProvider>
    )
  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles()(connect(mapStateToProps)(ClientPage))