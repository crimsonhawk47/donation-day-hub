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

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

let id = 0;
function createData(date, name, closeTeam) {
    id += 1;
    return { id, date, name, closeTeam,};
}

const rows = [
    createData('3-10-20', 'Sally', 'Open'),
    createData('3-10-20', 'John', 'Closed'),
    createData('3-12-20', 'Jill', 'Open'),
    createData('3-5-20', 'Mae', 'Closed'),
    createData('2-21-20', 'Darcy', 'Open'),
];

class AdminTeamList extends Component {

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Donation Day</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Close Team?</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.closeTeam}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

AdminTeamList.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = reduxStore => {
    return (
        { reduxStore }
    )
}

export default withStyles(styles)(connect(mapStateToProps)(AdminTeamList))
