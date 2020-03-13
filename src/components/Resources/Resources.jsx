import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'


const styles = theme=> ({
  root: {
    flexGrow: 1,
  }
});

class Resources extends Component {

  render() {
    const { classes } = this.props;

    return (
      <>
        <h1>Resources</h1>
        <div>
          <p>PLACEHODER FOR WAIVER LINK</p>
          <p>PLACEHOLDER FOR FUNDRAISING LINK</p>
          <a href="https://www.google.com/maps/d/viewer?mid=1YNvABle8y-WI0FApN89Lv9vb9uvhxXfe&ll=44.97750434462346%2C-93.27893059999997&z=14">Donation Day Map</a>
        </div>

      </>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles(styles)(connect(mapStateToProps)(Resources))