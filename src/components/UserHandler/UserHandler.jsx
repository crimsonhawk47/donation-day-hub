import React, { Component } from 'react';
import UserDashboard from '../UserDashboard/UserDashboard'
import AdminDashboard from '../AdminDashboard/AdminDashboard'
import AdminNav from '../AdminNav/AdminNav'
import { connect } from 'react-redux'

const UserHandler = (props) => {

    const access_level = props.access_level
    if (props.access_level < 3) {
      return <UserDashboard />
    }
    else if (props.access_level === 3) {
      return <AdminDashboard />
    }
  }


const mapStateToProps = reduxStore => {
  return (
    { access_level: reduxStore.user.access_level }
  )
}
export default connect(mapStateToProps)(UserHandler)