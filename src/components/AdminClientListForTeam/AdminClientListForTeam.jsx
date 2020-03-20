import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import { withRouter } from 'react-router-dom';

const moment = require('moment');

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 300,
    },
});

class AdminClientListForTeam extends Component {

    state = {
        client: [],
        backIcon: false
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CLIENT_LIST' });
    }

    handleClientClick = (id, team_id, name) => {
        this.props.history.push(`/client-page/${id}/${team_id}/${name}`)
    }

    render() {
        const { classes } = this.props;

        let clients = this.props.reduxStore.adminClientList
        const teamId = this.props.match.params.id

        let filteredClients = []

        if (clients) {
            filteredClients = clients.filter(
                (client) => client.team_id === Number(teamId)
            );
        }

        return (
            <Grid container justify='center'>
                <Grid item xs={9}>
                    <Paper className={classes.root}>

                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><b>Clients</b></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!filteredClients[0] ?
                                    <TableRow >
                                        <TableCell align="center">This team hasn't added any clients</TableCell>
                                    </TableRow>
                                    : <div></div>}
                                {filteredClients.map(client => {
                                    return (
                                        <TableRow key={client.id} onClick={() => { this.handleClientClick(client.id, client.team_id, client.name) }}>
                                            <TableCell align="center">{client.name}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Paper>

                </Grid>
            </Grid>
        );
    }
}

AdminClientListForTeam.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = reduxStore => {
    return (
        { reduxStore }
    )
}

export default withStyles(styles)(withRouter(connect(mapStateToProps)(AdminClientListForTeam)))
