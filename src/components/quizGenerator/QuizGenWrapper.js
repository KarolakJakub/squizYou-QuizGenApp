import React from "react";
import "./QuizGenWrapperStyles.css";
import AnswersList from "./AnswersList";
import QuestionInput from "./QuestionInput";
import QuizTitleInput from "./QuizTitleInput";
import RemoveQuestionButton from "./RemoveQuestionButton";
import AddQuestionButton from "./AddQuestionButton";
import AddAnswerButton from "./AddAnswerButton";
import { Dimmer, Loader, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { fetchQuiz, saveQuiz } from '../../services/QuizService'
import { BrowserRouter as Route, withRouter, Prompt } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";
import { Container } from "semantic-ui-react";

const selectQuizByUniqueId = (quizes, uniqueId) => {
  return quizes.find(quiz => quiz.uniqueId === uniqueId)
}

class QuizGenWrapper extends React.PureComponent {

  state = {
    title: '',
    quiz: [],
    quizes: [],
    isLoading: true,
    isSaved: true
  };

  fetchAndUpdate() {

    const uniqueId = this.props.match.params.id
    this.setState({ isLoading: true })
    fetchQuiz((quizes) => {

      this.setState({
        quiz: selectQuizByUniqueId(quizes, uniqueId),
        // quizes: quizes,
        isLoading: false,
        isSaved: true,
      })

      this.setState({
        title: this.state.quiz.title
      })

    }
    )
  }



  componentDidMount() {

    return this.fetchAndUpdate()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading === false &&
      prevState.quiz.questions !== undefined
    ) {
      if (
        this.state.quiz.questions.length - 1 ===
        prevState.quiz.questions.length
      ) {
        this.scrollToBottom();
      }
    }
  }

  scrollToBottom = () => {
    this.element && this.element.scrollIntoView({ behavior: "smooth" });
  };

  handleTitleChange = newTitle => {

    newTitle.preventDefault()


    const newState = {
      title: newTitle.target.value,
      isSaved: false
    }

    this.setState(newState);

  };

  handleQuestionChange = (questionId, newQuestion) => {
    const newQuestions = this.state.quiz.questions.map(questionObject => {
      if (questionObject.id === questionId) {
        return {
          ...questionObject,
          question: newQuestion
        };
      } else {
        return questionObject;
      }
    });
    this.setState({
      quiz: {
        ...this.state.quiz,
        questions: newQuestions
      }, isSaved: false
    });
  };

  handleAnswerChange = (event, questionId) => {
    const answerId = event.target.name;
    const answerInput = event.target.value;

    const newQuestions = this.state.quiz.questions.map(question => {
      if (question.id === questionId) {
        question.answers.map(answer => {
          if (answer.id === answerId) {
            answer.answer = answerInput;
            return answer;
          } else {
            return answer;
          }
        });
        return question;
      } else {
        return question;
      }
    });

    this.setState({
      quiz: {
        ...this.state.quiz,
        questions: newQuestions
      }, isSaved: false
    });
  };

  handleSaveQuiz = () => {


    const newQuizes = this.state.quizes.map(quiz => {
      if (quiz.uniqueId === this.state.quiz.uniqueId) {
        return this.state.quiz
      } else {
        return quiz
      }
    })
    this.setState({
      quizes: newQuizes,
    },
      () => saveQuiz(this.state.quiz))
    alert("Twój Quiz został zapisany")
  };

  handleAddQuestion = () => {
    const newQuestionCard = {
      id: `${this.state.quiz.questions.length + 1}`,
      question: "",
      answers: [
        {
          id: "1",
          answer: "",
          correct: true
        },
        {
          id: "2",
          answer: "",
          correct: false
        }
      ]
    };
    const newQuestions = [...this.state.quiz.questions, newQuestionCard];
    this.setState({
      quiz: {
        ...this.state.quiz,
        questions: newQuestions
      }, isSaved: false
    });
  };

  handleRemoveQuestion = questionId => {
    if (this.state.quiz.questions.length > 1) {
      const newQuestions = this.state.quiz.questions.filter(
        question => question.id !== questionId
      );

      let questionIndex = 0;

      newQuestions.map(question => {
        questionIndex = questionIndex + 1;
        return (question.id = `${questionIndex}`);
      });
      this.setState({
        quiz: {
          ...this.state.quiz,
          questions: newQuestions
        }, isSaved: false
      });
    }
  };

  handleAddAnswer = questionId => {
    const newQuestions = this.state.quiz.questions.map(question => {
      if (question.id === questionId && question.answers.length < 6) {
        const newAnswer = {
          id: `${question.answers.length + 1}`,
          answer: "",
          correct: false
        };
        question.answers.push(newAnswer);
        return question;
      } else {
        return question;
      }
    });

    this.setState({
      quiz: {
        ...this.state.quiz,
        questions: newQuestions
      }, isSaved: false
    });
  };

  handleRemoveAnswer = (event, questionId) => {
    const answerId = event.target.name;

    let checkMinCorrectAnswers = this.checkCorrectAnswers(questionId);

    const newQuestions = this.state.quiz.questions.map(question => {
      if (question.id === questionId && question.answers.length > 2) {
        const newAnswers = question.answers.filter(answer => {
          if (checkMinCorrectAnswers <= 1 && answer.correct === true) {
            return answer;
          }
          return answer.id !== answerId;
        });

        let answerIndex = 0;

        newAnswers.map(answer => {
          answerIndex = answerIndex + 1;
          answer.id = `${answerIndex}`;

          return answer;
        });
        question.answers = newAnswers;
        return question;
      } else {
        return question;
      }
    });

    this.setState({
      quiz: {
        ...this.state.quiz,
        questions: newQuestions
      }, isSaved: false
    });
  };

  handleCheckboxChange = (questionId, event) => {
    const answerId = event.target.name;

    let checkMinCorrectAnswers = this.checkCorrectAnswers(questionId);

    const newQuestions = this.state.quiz.questions.map(question => {
      if (question.id === questionId) {
        question.answers.map(answer => {
          if (answer.id === answerId) {
            if (checkMinCorrectAnswers <= 1 && answer.correct === true) {
              return answer;
            } else {
              answer.correct = !answer.correct;
            }
            return answer;
          } else {
            return answer;
          }
        });
        return question;
      } else {
        return question;
      }
    });

    this.setState({
      quiz: {
        ...this.state.quiz,
        questions: newQuestions
      }, isSaved: false
    });
  };

  checkCorrectAnswers = questionId => {
    return this.state.quiz.questions[questionId - 1].answers.filter(
      answer => answer.correct === true
    ).length;
  };

  setRefForLastElement = (el, index, questionsCount) => {
    if (questionsCount === index) {
      this.element = el;
    }
  };



  renderQuestions = () => {

    const { questions } = this.state.quiz;
    const questionsCount = questions.length - 1;

    return questions.map((question, index) => (
      <div
        key={question.id}
        className={"quizGenInputs"}
        ref={el => this.setRefForLastElement(el, index, questionsCount)}
      >
        <RemoveQuestionButton
          onClick={event => this.handleRemoveQuestion(question.id, event)}
        />
        <QuestionInput
          question={question}
          onChange={this.handleQuestionChange}
        />
        <AnswersList
          question={question}
          questionId={index}
          onClickRemoveAnswer={event =>
            this.handleRemoveAnswer(event, question.id)
          }
          onClickCheckboxChange={event =>
            this.handleCheckboxChange(question.id, event)
          }
          onAnswerChange={event => this.handleAnswerChange(event, question.id)}
        />
        <AddAnswerButton onClick={() => this.handleAddAnswer(question.id)} />
      </div>
      ))

  };

  render() {


    return (<>

      {this.state.isLoading ? <Dimmer active>
        <Loader size='massive'>Proszę czekać...</Loader>
      </Dimmer> :
        <>
          <Prompt
            when={!this.state.isSaved}
            message='Quiz nie został zapisany. Czy na pewno chcesz wyjść?'
          />
          <Container>
            <div className="quizGenWrapper">
              <h1 className="quizGenHeader">STWÓRZ QUIZ</h1>
              <QuizTitleInput quizTitle={this.state.title} onChange={this.handleTitleChange} />
              {this.renderQuestions()}
              <div className='saveAndAddButtons'>
                <AddQuestionButton onClick={this.handleAddQuestion} />
                <button onClick={this.handleSaveQuiz} className="saveQuizButton">ZAPISZ QUIZ</button>
                <ScrollUpButton />
              </div>
            </div>
          </Container>
        </>}
    </>
    );
  }
}

export default withRouter(QuizGenWrapper)