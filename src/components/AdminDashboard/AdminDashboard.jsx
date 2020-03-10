import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
        value: ''
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    }

    render() {
        const classes = this.props;
        // const [value, setValue] = React.useState(0);

         

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={this.state.value} onChange={this.handleChange}>
                        <Tab label="Item One" />
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                    </Tabs>
                </AppBar>
                {this.state.value === 0 && <TabContainer>Volunteers</TabContainer>}
                {this.state.value === 1 && <TabContainer>Clients</TabContainer>}
                {this.state.value === 2 && <TabContainer>Team</TabContainer>}
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
