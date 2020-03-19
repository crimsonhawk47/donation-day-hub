import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'


const styles = theme => ({
    root: {
        flexGrow: 1,
    }
});

class ClientChat extends Component {

    render() {
        const { classes } = this.props;
        const messages = this.props.reduxStore.messages
        const clientId = this.props.clientId

        return (
            <Grid container>
                {messages.filter(message => message.client_id = clientId).map(filteredMessage => {
                    return (
                        <Grid item xs={12}>
                            <Typography>{filteredMessage.first_name} {filteredMessage.last_name}: {filteredMessage.message}</Typography>
                        </Grid>
                    )
                })}

            </Grid>
        )

    }
}

const mapStateToProps = reduxStore => {
    return (
        { reduxStore }
    )
}
export default withStyles(styles)(connect(mapStateToProps)(ClientChat))