import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));


export default function AddAnswerButton(props) {
    const classes = useStyles();

    const { onClick } = props;
    
    return (
        <Button variant="contained" color="primary" className={classes.button} onClick={onClick}>Dodaj Odpowiedź</Button>
    )
}


