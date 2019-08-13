import React from "react";
import styles from "./QuizTitle.module.css";
import { stringLiteral } from "@babel/types";
import { QuestionsButtons } from "./QuestionsButtons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AddAnswerButton from "../quizGenerator/AddAnswerButton";
import { fetchQuiz } from "../../services/QuizService";
import { Dimmer, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Answer = ({ answer, isClicked, onClick }) => (
  <li className={styles.possibleAnswer}>
    <button
      className={`${styles.button} ${isClicked ? styles.button : ""}`}
      style={{
        backgroundColor: `${isClicked ? "#9ad16b" : "white"}`
      }}
      onClick={() => {
        onClick(answer.id);
      }}
    >
      {answer.answer}
    </button>
  </li>
);

const Spinner = () => (
  <Dimmer active>
    <Loader size="massive">Proszę czekać...</Loader>
  </Dimmer>
);

export default class Quiz extends React.Component {
  state = {
    currentQuestionId: 0,
    answers: {},
    questions: {},
    areQuestionsLoading: true,
    isQuizComplete: false,
    quizes: [],
    quizId: this.props.match.params.id
  };

  getQuizResult() {
    const { questions, answers } = this.state;
    const score = questions.questions.reduce((accu, question) => {
      return question.correctAnswers.every(
        answer =>
          answers[question.id - 1].includes(`${answer}`) &&
          question.correctAnswers.length === answers[question.id - 1].length
      )
        ? accu + 1
        : accu;
    }, 0);
    return score / questions.questions.length;
  }

  componentDidMount() {
    this.setState(
      {
        areQuestionsLoading: true
      },
      () =>
        fetchQuiz(quizes => {
          this.setState({
            quizes,
            areQuestionsLoading: false,
            questions: quizes.find(
              quiz => quizes.indexOf(quiz) == this.props.match.params.id
            )
          });
        })
    );
  }

  handleAnswerClick = (answerId, questionId) => {
    const { answers, currentQuestionId } = this.state;

    const previousAnswers = this.state.answers[questionId]
      ? [...this.state.answers[questionId]]
      : [];

    this.setState({
      answers: {
        ...answers,
        [currentQuestionId]: [...new Set([...previousAnswers, answerId])]
      }
    });

    if (answers[questionId] !== {} && answers[questionId] !== undefined) {
      if (answers[questionId].includes(answerId)) {
        const newCorrectAnswers = answers[questionId].filter(
          answer => answer !== answerId
        );
        this.setState({
          answers: {
            ...answers,
            [currentQuestionId]: [...newCorrectAnswers]
          }
        });
      }
    }
  };

  handleQuestionChangeClick = questionId => {
    this.setState({ currentQuestionId: questionId });
  };

  handleQuizCompleteClick = () => {
    const { answers, questions } = this.state;
    const checkForAnswers = Object.values(answers).find(
      answer => answer.length === 0
    );

    if (
      checkForAnswers === undefined &&
      Object.keys(answers).length === questions.questions.length
    ) {
      if (window.confirm("Czy na pewno chcesz zakończyć quiz?")) {
        this.setState({ isQuizComplete: true });
      }
    } else {
      alert("Odpowiedz najpierw na wszystkie pytania!");
    }
  };

  handleQuizStartClick = () => {
    this.setState({
      currentQuestionId: 0,
      answers: {},
      isQuizComplete: false
    });
  };

  isSelectedAnswer(questionId, currentAnswerId) {
    const { answers, currentQuestionId } = this.state;

    if (answers[questionId] !== {} && answers[questionId] !== undefined) {
      if (answers[questionId].includes(currentAnswerId)) {
        return true;
      } else {
        return false;
      }
    }
  }

  renderQuestion(question, questionId, quizId) {
    let questionsIndexZero = this.state.questions.questions[questionId];
    return (
      <div>
        <h1 className={styles.quizTitleName}>
          {this.state.quizes[quizId].title}
        </h1>
        <div className={styles.answerWrapper}>
          <h1 className={styles.quizName}>{questionsIndexZero.question}</h1>
          <ul className={styles.answerList}>
            {questionsIndexZero.answers.map(answer => (
              <Answer
                key={answer.id}
                answer={answer}
                className={styles.answer}
                isClicked={this.isSelectedAnswer(questionId, answer.id)}
                onClick={() => this.handleAnswerClick(answer.id, questionId)}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }

  renderQuestionsButtons() {
    const { currentQuestionId, questions, quizes } = this.state;

    return (
      <QuestionsButtons
        onQuestionChangeHandler={this.handleQuestionChangeClick}
        currentQuestionId={currentQuestionId}
        totalNumberOfQuestion={questions.questions.length}
        questions={questions}
      />
    );
  }

  renderFinishQuizButton() {
    return (
      <div className={styles.finishQuizWrap}>
        <button
          className={styles.finishQuiz}
          onClick={this.handleQuizCompleteClick}
        >
          ZAKOŃCZ QUIZ
        </button>
      </div>
    );
  }

  renderStartQuizButton() {
    return (
      <div className={styles.startNewQuizWrap}>
        <Link to={"/quizlist"}>
          <button
            className={styles.startNewQuiz}
            onClick={this.handleQuizStartClick}
          >
            Przejdź do listy dostępnych quizów
          </button>
        </Link>
      </div>
    );
  }

  renderQuizComplete() {
    const { quizes, quizId } = this.state;
    const lastResult = localStorage.getItem(
      `Wyniki z Quizu: ${quizes[quizId].title}`
    );
    const result = Math.floor(this.getQuizResult() * 100);
    localStorage.setItem(
      `Wyniki z Quizu: ${quizes[quizId].title}`,
      JSON.stringify(result)
    );

    return (
      <div>
        <p className={styles.score}>Twój wynik: {result}%</p>
        <p className={styles.score}>Twój ostatni wynik: {lastResult}%</p>
        {this.renderStartQuizButton()}
      </div>
    );
  }

  render() {
    const {
      areQuestionsLoading,
      currentQuestionId,
      quizId,
      questions,
      isQuizComplete
    } = this.state;

    if (isQuizComplete) {
      return this.renderQuizComplete();
    }

    if (!questions || areQuestionsLoading) {
      return <Spinner />;
    }

    const currentQuestion = questions[currentQuestionId];

    return (
      <div className={styles.quizTitles}>
        <div className={styles.questionCard}>
          {this.renderQuestion(currentQuestion, currentQuestionId, quizId)}
          {this.renderQuestionsButtons(questions)}
          {this.renderFinishQuizButton()}
        </div>
      </div>
    );
  }
}
