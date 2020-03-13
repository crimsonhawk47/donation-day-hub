import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AdminVolunteerList from '../AdminVolunteerList/AdminVolunteerList'
import AdminClientList from '../AdminClientList/AdminClientList'
import AdminTeamList from '../AdminTeamList/AdminTeamList'

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const useStyles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class AdminDashboard extends Component {
    state = {
        value: 0
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    }

    navToVolunteerList = (id) => {
        this.props.history.push(`/admin-volunteer-page/${id}`)
    }


    render() {
        const classes = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={this.state.value} onChange={this.handleChange}>
                        <Tab label="Volunteers" />
                        <Tab label="Clients" />
                        <Tab label="Teams" />
                    </Tabs>
                </AppBar>
                {this.state.value === 0 && 
                <TabContainer>
                    <AdminVolunteerList 
                        navToVolunteerList={this.navToVolunteerList} 
                    />
                </TabContainer>}
                {this.state.value === 1 && <TabContainer><AdminClientList /></TabContainer>}
                {this.state.value === 2 && <TabContainer><AdminTeamList /></TabContainer>}
            </div>
        );
    }
}

const mapStateToProps = reduxStore => {
    return (
        { reduxStore }
    )
}

export default withStyles(useStyles)(connect(mapStateToProps)(AdminDashboard))
