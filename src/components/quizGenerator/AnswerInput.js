import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import './QuizGenWrapperStyles.css'


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

const AnswerInput = function (props) {

    const classes = useStyles();

    const { answer, isCorrect, answerId, onCheckboxChange, name, onAnswerChange, onClickRemoveAnswer } = props
    
    return (
        <div className="answerInputsStyles">
            <TextField
                className="answerInput"
                value={answer}
                placeholder='Wprowadź odpowiedź'
                onChange={onAnswerChange}
                label="Odpowiedź"
                multiline
                variant="outlined"
                answerid={answerId}
                name={answerId}
            ></TextField>
            <Checkbox
                className="isAnswerCorrect"
                color="default"
                iscorrect={'isCorrect'}
                onClick={onCheckboxChange}
                answerid={answerId}
                inputProps={{
                    'aria-label': 'checkbox with default color',
                }}
                checked={isCorrect}
                name={name}
            />
            <button className='removeAnswerButton' name={answerId} onClick={onClickRemoveAnswer} >
                X
           </button>
        </div>
    )
}

function arePropsEqual(prevProps, currProps) {
    if( prevProps.answer === currProps.answer && prevProps.isCorrect === currProps.isCorrect && prevProps.answerId === currProps.answerId && prevProps.name === currProps.name){
        return true
    }else{
        return false
    }
}

export default React.memo(AnswerInput, arePropsEqual)

