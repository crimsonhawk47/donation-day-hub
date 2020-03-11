import React, { Component } from 'react';
import UserDashboard from '../UserDashboard/UserDashboard'
import { connect } from 'react-redux'

class UserHandler extends Component {

  render() {
    const access_level = this.props.access_level

    if (access_level < 3) {
      return (
        <UserDashboard />
      )
    }
    else if (access_level === 3) {
      return (
        <h1>Admin Component</h1>
      )
    }


  }
}

const mapStateToProps = reduxStore => {
  return (
    { access_level: reduxStore.user.access_level }
  )
}
export default connect(mapStateToProps)(UserHandler)