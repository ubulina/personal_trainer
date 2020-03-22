import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';



export default function AddTraining(props) {

    const [open, setOpen] = React.useState(false);

    const [training, setTraining] = React.useState({

        date: '', activity: '', duration: '', customer: ''
    })

    const handleClickOpen = () => {

        setTraining({...training, customer: props.customer.links[0].href})
        //kun lomake avataan, päivitetään treenin tilaan tieto asiakkaasta

    setOpen(true);

    };

    const handleClose = () => {

    setOpen(false);

    };

    const handleInputChange = (event) => {

        setTraining({...training, [event.target.name]: event.target.value})
  
  
    }

    const addTraining = () => {

        props.addTraining(training)
        handleClose()
        //lisätään asiakkaalle treeni, onko oikea osoite?

    }

    const useStyles = makeStyles(theme => ({
            container: {
              display: 'flex',
              flexWrap: 'wrap',
            },
            textField: {
              marginLeft: theme.spacing(0),
              marginRight: theme.spacing(1),
              width: 200,
            },
    }));
    
    const classes = useStyles();
    

    return (

    <div>

    <Button style={{margin: 10}} variant="contained" color="primary" size= 'small' onClick={handleClickOpen}>
        Add Training
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New Training</DialogTitle>
        <DialogContent>
            <TextField
            autofocus
            id="datetime-local"
            name ="date"
            label="Date"
            type="datetime-local"
            defaultValue="2020-05-24T10:30"
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            value ={training.date}
            onChange = {e => handleInputChange(e)}
            fullWidth
            />
        
            <TextField
            margin="dense"
            name ="activity"
            value ={training.activity}
            onChange = {e => handleInputChange(e)}
            label="Activity"
            fullWidth
          />
          <TextField
            margin="dense"
            name ="duration"
            value ={training.duration}
            onChange = {e => handleInputChange(e)}
            label="Duration in minutes"
            fullWidth
          />
        </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
           Cancel
        </Button>
        <Button onClick={addTraining} color="primary">
          Save
        </Button>
      </DialogActions>

    </Dialog>

    </div>

    );
}