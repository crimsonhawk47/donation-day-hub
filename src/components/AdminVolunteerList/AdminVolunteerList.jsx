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
function createData(date, name, makeCaptain) {
    id += 1;
    return { id, date, name, makeCaptain };
}

const rows = [
    createData('1-2-20', 'Ed', 'Yes'),
    createData('2-5-20', 'Mitch', 'No'),
    createData('1-7-20', 'Sara', 'Yes'),
    createData('1-1-20', 'Amber', 'Yes'),
    createData('2-1-20', 'Meghan', 'Yes'),
];

class AdminVolunteerList extends Component {

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Make Captain?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.makeCaptain}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

AdminVolunteerList.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = reduxStore => {
    return (
        { reduxStore }
    )
}

export default withStyles(styles)(connect(mapStateToProps)(AdminVolunteerList))
