import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';



const styles = theme=> ({
  root: {
    flexGrow: 1,
  }
});

class EditListItem extends Component {
    state = {
        open: false,
        setOpen: false,
        id: this.props.id,
        name: this.props.name,
        client_id: this.props.client_id,
        new_name: ''
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
            // item_id: this.props.reduxStore.teamById.team_id,
        })
    };

    handleClose = (id) => {
        console.log(this.state);

        if (id === 'edit') {
            console.log(`in id:`, );
            
            this.props.dispatch({
                type: "EDIT_ITEM",
                payload: {
                    name: this.state.name,
                    id: this.state.id,
                    client_id: this.state.client_id
                }
            })
            this.setState({
                open: false,
           })
        } else {
            this.setState({
                open: false,
                name: this.props.name
            })
        }
    };

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value
        })
    }

    handleEdit = () => {
        console.log(`we editing again`, this.state);
        
    }


  render() {
    const { classes } = this.props;

    return (
<>
            <Fab
                variant='contained'
                color="primary"
                size="small"
                onClick={this.handleClickOpen}
            >
                <EditIcon fontSize="small" />
            </Fab>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">EDIT ITEM</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Item"
                        type="name"
                        value={this.state.name}
                        fullWidth
                        onChange={this.handleInputChangeFor('name')}
                    />
                </DialogContent>
            <DialogActions>
            <Button onClick={(e) => this.handleClose('cancel', e)} color="primary">
                Cancel
              </Button>
            <Button onClick={(e) => this.handleClose('edit', e)} color="primary">
                Confirm
              </Button>
        </DialogActions>
        </Dialog>
</>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles(styles)(connect(mapStateToProps)(EditListItem))