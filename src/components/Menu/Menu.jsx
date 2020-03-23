import React from 'react';
import '../Menu/Menu.css'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import IntersectionIcon from '../NavIcons/Logo Icon.png'
import LogOutButton from '../LogOutButton/LogOutButton';

import CardMedia from '@material-ui/core/CardMedia';

const drawerWidth = 150;

const color = createMuiTheme({
  palette: {
      primary: {
          main: '#283748'
      }
  }
})

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  
});

class Menu extends React.Component {
  state = {
    open: false,
  };

  logOut = () => {
    this.props.dispatch({ type: 'LOGOUT' })
    this.handleDrawerClose();
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  goToPage = (url) => {
    this.props.history.push(url)
    this.handleDrawerClose();

  }

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <ThemeProvider color={color}>
        <div className={classes.root}>
          <CssBaseline />
          <div className="app-bar">
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar color="primary" disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Donation Day Hub
            </Typography>
            </Toolbar>
          </AppBar>
          </div>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <CardMedia
              className={classes.media}
              image={IntersectionIcon}
              title="Logo"
            />


            <List>
              {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
              <Button onClick={() => { this.goToPage(`/home`) }}>
                <img src={IntersectionIcon} alt="icon" className="intersectionIcon" />
              </Button>
              <br />
              <br/>
              <Button className="nav-link" onClick={() => { this.goToPage(`/home`) }}>
                {this.props.reduxStore.user.id ? 'Home' : 'Login / Register'}
              </Button>
              <br />
              <br/>
              {this.props.reduxStore.user.id && (
                <>
                  {this.props.reduxStore.user.access_level !== 3 ?
                    <Button align="right" className="nav-link" onClick={() => { this.goToPage(`/team-page`) }}>
                      Team
                    </Button> : <></>}
                  <br/>
                  <br/>
                  <Button align="center" className="nav-link" onClick={this.logOut} >Log Out</Button>
                </>
              )}
            </List>
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
          </main>
        </div>
      </ThemeProvider>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}

export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Menu)));