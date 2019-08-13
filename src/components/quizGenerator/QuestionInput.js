import React from 'react'
import TextField from '@material-ui/core/TextField';



function QuestionInput(props) {


    return (
        <div className='questionAndDeleteButtonInput'>
            <p className='questionID'>{props.question.id} </p>
            <TextField
                id="outlined-multiline-static"
                label="Pytanie"
                placeholder="Wprowadź pytanie"
                name={props.question.id}
                multiline
                rows="4"
                value={props.question.question}
                onChange={event => props.onChange(props.question.id, event.target.value)}
                className="questionInput"
                margin="normal"
                variant="outlined"
            />

        </div>
    )
}

function arePropsEqual(prevProps, nextProps) {
    if (prevProps.question.question === nextProps.question.question && prevProps.question.id === nextProps.question.id) {
        return true
    } else {
        return false
    }
}

export default React.memo(QuestionInput, arePropsEqual)
