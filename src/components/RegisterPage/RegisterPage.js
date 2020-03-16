import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    // primary: '#283748',
    // secondary: '#6d89b1',
    // tertiary: '#808281',
    // quaternary: '#f6f6f6'
  }
})

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNum: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    accessLevel: ''
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          phoneNum: this.state.phoneNum,
          streetAddress: this.state.streetAddress,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip,
          accessLevel: 1
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>

        <div>
          {this.props.errors.registrationMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.registrationMessage}
            </h2>
          )}
          <form onSubmit={this.registerUser}>
            <h1>Register User</h1>
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
              <label htmlFor="firstName">
                <TextField
                  required
                  id="standard-required"
                  label="First Name"
                  margin="dense"
                  value={this.state.firstName}
                  onChange={this.handleInputChangeFor('firstName')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="lastName">
                <TextField
                  required
                  id="standard-required"
                  label="Last Name"
                  margin="dense"
                  value={this.state.lastName}
                  onChange={this.handleInputChangeFor('lastName')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="email">
                <TextField
                  required
                  id="standard-required"
                  label="Email"
                  margin="dense"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor('email')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="phoneNum">
                <TextField
                  required
                  id="standard-required"
                  label="Phone Number"
                  margin="dense"
                  value={this.state.phoneNum}
                  onChange={this.handleInputChangeFor('phoneNum')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="streetAddress">
                <TextField
                  required
                  id="standard-required"
                  label="Street Address"
                  margin="dense"
                  value={this.state.streetAddress}
                  onChange={this.handleInputChangeFor('streetAddress')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="city">
                <TextField
                  required
                  id="standard-required"
                  label="City"
                  margin="dense"
                  value={this.state.city}
                  onChange={this.handleInputChangeFor('city')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="state">
                <TextField
                  required
                  id="standard-required"
                  label="State"
                  margin="dense"
                  value={this.state.state}
                  onChange={this.handleInputChangeFor('state')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="zip">
                <TextField
                  required
                  id="standard-required"
                  label="Zip"
                  margin="dense"
                  value={this.state.zip}
                  onChange={this.handleInputChangeFor('zip')}
                />
              </label>
            </div>
            <div>
              <Button
                type="button"
                className="register"
                variant="contained"
                color="secondary"
                type="submit"
                name="submit"
                value="Register"
              />
            </div>
          </form>
          <center>
            <Button
              type="button"
              className="link-button"
              onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
            >
              Login
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

export default connect(mapStateToProps)(RegisterPage);

