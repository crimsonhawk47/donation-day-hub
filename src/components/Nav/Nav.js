import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import IntersectionIcon from '../NavIcons/Logo Icon.png'
import LogOutButton from '../LogOutButton/LogOutButton';
import Home from '../NavIcons/home1.png';
import Team from '../NavIcons/collaboration.png';
import Resources from '../NavIcons/checklist.png';
import Logout from '../NavIcons/logout.png';
import './Nav.css';
import Menu from '../Menu/Menu.jsx';

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      {/* <h2 className="nav-title">Donation Day Hub</h2> */}
      <img src={IntersectionIcon} alt="icon" className="intersectionIcon" />
      <p className='test'>{props.user.id}</p>
    </Link>
    <div className="nav-right">
      
      <Link className="nav-link" to="/home">
        
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? <img src={Home} alt="home" className="home" /> : 'Login / Register'}
      </Link>
      
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Link className="nav-link" to="/team-page">
            <img src={Team} alt="team" className="team" />
          </Link>
          <Link className="nav-link" to="/resources">
            <img src={Resources} alt="resources" className="resources" />
          </Link>
          <LogOutButton className="nav-link" to="/home" />
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
