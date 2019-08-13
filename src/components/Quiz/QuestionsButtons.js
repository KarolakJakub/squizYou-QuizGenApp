import React from "react";
import styles from "./QuizTitle.module.css";

const Button = ({ children, disabled = false, onClick, isQuestionNumber }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${styles.buttonQuestion} ${styles.buttonQuestionNumber}`}
  >
    {children}
  </button>
);

const Arrowbutton = ({
  children,
  disabled = false,
  onClick,
  isQuestionNumber
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${styles.arrowButtonQuestion} ${styles.buttonQuestionNumber}`}
  >
    {children}
  </button>
);

const DoubleArrowButtonQuestion = ({
  children,
  disabled = false,
  onClick,
  isQuestionNumber
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${styles.doubleArrowButtonQuestion}`}
  >
    {children}
  </button>
);

export class QuestionsButtons extends React.Component {
  render() {
    const {
      onQuestionChangeHandler,
      currentQuestionId,
      totalNumberOfQuestion,
      questions
    } = this.props;

    const renderButtons = () => {
      let questions = Array(this.props.questions.questions.length) // [].length == 10
        .fill(1) // [1,1,1,1,1,1,1,1,1,1,1]
        .map((_, index) => index + 1); // [1,2,3,4,5,6,7,8,9,10]
      if (currentQuestionId < 3) {
        questions = questions.slice(0, 5);
      } else if (currentQuestionId > totalNumberOfQuestion - 3) {
        questions = questions.slice(-5);
      } else {
        questions = questions.slice(
          currentQuestionId - 2,
          currentQuestionId + 3
        );
      }
      return questions.map((question, index) => (
        <Button
          onClick={() => {
            onQuestionChangeHandler(question - 1);
          }}
          disabled={currentQuestionId + 1 === question}
          key={index}
        >
          {question}
        </Button>
      ));
    };

    return (
      <div className={styles.pagination}>
        <DoubleArrowButtonQuestion
          disabled={!currentQuestionId}
          onClick={() => onQuestionChangeHandler(0)}
          className={styles.doubleArrowButtonQuestion}
        >
          {"<<"}
        </DoubleArrowButtonQuestion>
        <Arrowbutton
          disabled={!currentQuestionId}
          onClick={() => onQuestionChangeHandler(currentQuestionId - 1)}
          className={`${styles.arrowButtonQuestion} ${
            styles.buttonQuestionNumber
          }`}
        >
          {"<"}
        </Arrowbutton>
        {renderButtons()}
        <Arrowbutton
          disabled={currentQuestionId === totalNumberOfQuestion - 1}
          onClick={() => onQuestionChangeHandler(currentQuestionId + 1)}
          className={`${styles.arrowButtonQuestion} ${
            styles.buttonQuestionNumber
          }`}
        >
          {">"}
        </Arrowbutton>
        <DoubleArrowButtonQuestion
          disabled={currentQuestionId === totalNumberOfQuestion - 1}
          onClick={() => onQuestionChangeHandler(totalNumberOfQuestion - 1)}
          className={styles.doubleArrowButtonQuestion}
        >
          {">>"}
        </DoubleArrowButtonQuestion>
      </div>
    );
  }
}
