import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import '../App/App.css'
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

  handleClientFetch = () => {
    (`testing`);

  }

  componentDidMount() {
    if (!this.props.reduxStore.teamById.id) {
      this.props.dispatch({
        type: 'FETCH_TEAM',
      })
    }
  }

  render() {
    return (
      <div className="team-page">
        <h1>
          Team {this.props.reduxStore.teamById.captain_name}
        </h1>
        <br />
        <AddClient />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell >
                  <h2>Client Name</h2>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {this.props.reduxStore.clientsByTeamId.map((clients) => {
                    return (
                      <ClientList onChange={this.handleClientFetch} id={clients.id} name={clients.name} bio={clients.bio} location={clients.location}/>
                    )
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>)
  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles()(connect(mapStateToProps)(TeamPage))