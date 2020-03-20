import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function AddTraining() {

    const [open, setOpen] = React.useState(false);

    const [training, setTraining] = React.useState({

        date: '', activity: '', duration: ''
    })

    const handleClickOpen = () => {

    setOpen(true);

    };

    const handleClose = () => {

    setOpen(false);

    };

    return (

    <div>

    <Button style={{margin: 10}} variant="contained" color="default" onClick={handleClickOpen}>
        Add New Training
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New Training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
           Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Save
        </Button>
      </DialogActions>

    </Dialog>

    </div>

    );
}