import React from "react";
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
 
class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
 
  render() {
    return (
      <div className="sweet-loading">
        <SyncLoader
          css={override}
          size={10}
          color={"#123abc"}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
    return (
      { loading: reduxStore.loading }
    )
  }

export default connect(mapStateToProps)(LoadingScreen)