import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
}));

const RemoveQuestionButton = (props) => {
  const classes = useStyles();
return (
  <div className='removeQuestionButton'>
    <Button variant="contained" color="secondary" className={classes.button} onClick={props.onClick}>USUŃ PYTANIE <DeleteIcon className={classes.rightIcon} /></Button>
  </div>
)}

export default RemoveQuestionButton

