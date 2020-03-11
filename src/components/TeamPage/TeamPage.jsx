import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ClientList from '../ClientList/ClientList'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddClient from '../AddClient/AddClient';



class TeamPage extends Component {
  state = {
    teamID: 1,
    open: false,
    setOpen: false,
  }


   handleClickOpen = () => {
    this.setState({
      open: true
    })
  };

   handleClose = () => {
    this.setState({
      setOpen: true
    })
  };


  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_TEAM',
      payload: this.state.teamID
    })

    this.props.dispatch({
      type: 'FETCH_CLIENTS_BY_TEAM',
      payload: this.state.teamID
    })
  }

  render() {
    return (
      <>
        <h1>
          Team {this.props.reduxStore.teamById.captain_name}
        </h1>
        <AddClient />


        <TableContainer><Table>
          <TableHead>
            <TableRow>
              <TableCell >
                <h2>Client Name</h2>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {this.props.reduxStore.clientsByTeamId.map((clients) => {
                  return (
                    <ClientList id={clients.id} name={clients.name} />
                  )
                })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </TableContainer>
      </>
    )
  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles()(connect(mapStateToProps)(TeamPage))