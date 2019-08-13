import React from 'react';





export default function AddQuestionButton(props) {
    

    const { onClick } = props;
 
    return (
        <button className='addQuestionButton' onClick={onClick}>DODAJ PYTANIE</button>
    )
 }

 