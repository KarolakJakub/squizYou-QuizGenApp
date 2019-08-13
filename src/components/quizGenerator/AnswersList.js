import React from "react";
import AnswerInput from "./AnswerInput";



export default function AnswersList(props) {




  return (

    < div className = "quizAnswerInputs" >
         

      {
        props.question.answers.map(answer => {
          return (
            <div key={answer.id}>
              <AnswerInput
                name={answer.id}
                autofocus
                key={answer.id}
                answerId={answer.id}
                answer={answer.answer}
                isCorrect={answer.correct}
                onCheckboxChange={props.onClickCheckboxChange}
                onAnswerChange={props.onAnswerChange}
                onClickRemoveAnswer={props.onClickRemoveAnswer}
              />
            </div>
          );
        })
      }
      </div >
    );

}
