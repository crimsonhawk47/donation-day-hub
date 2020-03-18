import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#283748',
    },
    secondary: {
      main: '#6d89b1'
    },
    tertiary: {
      main: '#808281'
    }
  }
})

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      this.props.history.push(`/home`)
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>

        <div className="log-in-form">
          {this.props.errors.loginMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.loginMessage}
            </h2>
          )}
          <form onSubmit={this.login}>
            <h1>Login</h1>
            <div>
              <label htmlFor="username">
                <TextField
                  required
                  id="standard-required"
                  label="Username"
                  margin="dense"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                <TextField
                  required
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  margin="dense"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </label>
            </div>
            <div>
              <Fab
                variant="extended"
                size="medium"
                color="secondary"
                aria-label="Add"
                className="log-in"
                type="submit"
                name="submit"
                value="LOG IN"
              >
                LOG IN
              </Fab>
            </div>
          </form>
          <center>
            <Button
              type="button"
              className="link-button"
              onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
            >
              Register
          </Button>
          </center>
        </div>
      </ThemeProvider>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
