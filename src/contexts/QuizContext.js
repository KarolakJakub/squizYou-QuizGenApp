import React, { useState } from 'react'
import initialQuizes from '../data/quizes.json'
import { fetchQuiz, saveQuiz } from '../services/QuizService'

export const QuizContext = React.createContext()

export const QuizProvider = function (props) {
    const [quizes, setQuizes] = useState(initialQuizes.quizes)

    const fetchQuizToContext = () => {
        const quizesRef = fetchQuiz(quiz => setQuizes(quiz))
        quizesRef.off('value')
    }

    const addQuiz = newQuiz => {
        setQuizes([...quizes, newQuiz])
    }

    const selectQuiz = (quizId) => {
        return quizes.find(quiz => quiz.id === quizId)
    }

    const selectQuizByUniqueId = (uniqueId) => {
        return quizes.find(quiz => quiz.uniqueId === uniqueId)
    }

    const updateQuizToContext = (updatedQuiz) => {
        const newQuizes = quizes.map(quiz => {
            if (quiz.uniqueId === updatedQuiz.uniqueId) {
                return updatedQuiz
            } else {
                return quiz
            }
        })

        setQuizes(newQuizes)
        saveQuiz(updatedQuiz)

    }

    return <QuizContext.Provider value={{
        quizes,
        setQuizes,
        selectQuiz,
        addQuiz,
        updateQuizToContext,
        fetchQuizToContext,
        selectQuizByUniqueId
    }} {...props} />
}

export const QuizConsumer = QuizContext.Consumer