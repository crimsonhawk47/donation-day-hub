import React from "react";
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/PropagateLoader";
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography, Box } from '@material-ui/core'

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
      <>
      <Box marginLeft={3} marginBottom={2}>
      <Grid container justify='center'>
        <h2>Uploading...</h2>
      </Grid>
      </Box>
      <Grid container justify='center'>

        <div className="sweet-loading">
          <SyncLoader
            css={override}
            size={18}
            color={"#123abc"}
            loading={this.props.loading}
          />
        </div>
      </Grid>
      </>

    );

  }
}

const mapStateToProps = reduxStore => {
  return (
    { loading: reduxStore.loading }
  )
}

export default connect(mapStateToProps)(LoadingScreen)