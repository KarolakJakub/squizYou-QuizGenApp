import React from 'react'

import TextField from '@material-ui/core/TextField';


function QuizTitleInput(props) {
    return (
        <>
            <TextField
                className="quizTitleInput"
                label="QUIZ"
                placeholder="Tytuł Quizu"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={event => {
                    props.onChange(event)
                }}
                value={props.quizTitle}
            />

        </>
    )
}

export default QuizTitleInput