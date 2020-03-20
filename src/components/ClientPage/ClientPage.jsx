import React, { Component } from 'react';
import '../App/App.css'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { Paper, Grid, Typography, Button } from '@material-ui/core'
import ShoppingList from '../ShoppingList/ShoppingList'
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ClientChat from '../ClientChat/ClientChat'

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
  }
})

class ClientPage extends Component {

  state = {
    name: '',
    client_id: this.props.match.params.id,
    team_id: this.props.match.params.teamId,
    purchased: false,
  }

  componentDidMount(){
    console.log(this.state.comment);
    
    
  }

  handleAddItem = (event) => {
    console.log(event.target.value);
    this.setState({
      name: event.target.value
    })
    console.log(this.state);
  }

  handleComment = (event) => {
    this.setState({comment: event.target.value})
  }

  handleSubmit = () => {
    if (this.state.name === ''){
      alert("Please add and item and description!")
    } else{
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

    return (
      <ThemeProvider theme={theme} classes={classes.root} >
        <div className="camera-icon">
          <Fab
            variant="outlined"
            color="primary"
            onClick={() => { this.goToMedia(client_id) }}>
            <PhotoCamera />
          </Fab>
        </div>
      <h1>{this.props.match.params.name}</h1>
        <h3>Shopping List</h3>
        <h4>Item Description</h4>
        <TextField
          onChange={this.handleAddItem}
          variant="outlined"
          fullWidth
          placeholder='Add Item' 
          value={this.state.name}/>
        <div className="client-page-add-item-btn">
          <Fab
            onClick={this.handleSubmit}
            variant="extended"
            color="secondary"
            size="small"
          >
            Click To Add
          </Fab>
        </div>
        <ShoppingList client_id={client_id} team_id={team_id} />
        
        <Grid container className='comment'>
        <TextField
          onChange={this.handleComment}
          variant="outlined"
          fullWidth
          multiline
          placeholder='comments' 
          value={this.state.comment}/>
        </Grid>
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