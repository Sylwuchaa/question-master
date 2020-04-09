import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { AppContainer, ButtonContainer } from '../../styled/components/GlobalComponents'
import { GlobalContext } from '../../App'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { TimeRemainingProgressBar } from '../Quiz/components/TimeRemainingProgressBar'

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 55%;
`
const AnswerListElm = styled.li`
  text-decoration: none;
  list-style: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
`
const List = styled.ul`
  padding: 0 !important;
  margin: 0 !important;
`
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 25px;
  width: 100%;
  height: 50%;
`
const Input = styled.input`
  width: 25px;
  height: 25px;
  background-color: #2196f3;
  background: none;
  cursor: pointer;
`
const Label = styled.label`
  cursor: pointer;
`
export type QuizConfig = '1500' | ('500' & string)
const maxTimeRemaining: QuizConfig = '500'

export const Quiz: React.FC = () => {
  const globalContext = useContext(GlobalContext)
  const { quizState, quizDispatch, initialState, inputsDispatch } = globalContext
  const history = useHistory()

  useEffect(() => {
    theShuffledArrayOfAnswers()
  }, [quizState.questionData, quizState.activeQuestion])

  useEffect(() => {
    const timer = setInterval(() => {
      handleForStartTimeRemaining()
    }, 1)

    return () => {
      clearTimeout(timer)
    }
  }, [quizState.millisecondsRemaining, quizState.activeQuestion])

  const handleForStartTimeRemaining = () => {
    if (quizState.millisecondsRemaining < 500) {
      return quizDispatch({ type: 'START_TIME_REMAINING' })
    }

    if (quizState.millisecondsRemaining === 500) {
      return handleNextButton()
    }

    return null
  }

  const theShuffledArrayOfAnswers = () => {
    if (isUncontrolledEntry()) {
      return <Redirect to="/wrong" />
    }

    let arrayOfIncorrectAnswers = quizState.questionData[quizState.activeQuestion].incorrect_answers
    const correctAnswer = quizState.questionData[quizState.activeQuestion].correct_answer

    arrayOfIncorrectAnswers = [...arrayOfIncorrectAnswers, correctAnswer]

    return quizDispatch({
      type: 'NEW_ANSWERS_ARRAY',
      payload: arrayOfIncorrectAnswers.sort(() => Math.random() - 0.5),
    })
  }

  const randerAnswerListElement = () => {
    return quizState.shuffleAnswers.map((answer: string, index: number) => (
      <div key={answer + index} className="notification is-warning is-loading">
        <AnswerListElm className="subtitle is-3">
          <Input id={`elem${index}`} className="is-primary" type="checkbox" />
          <Label htmlFor={`elem${index}`}> {answer}</Label>
        </AnswerListElm>
      </div>
    ))
  }

  const handleNextButton = () => {
    if (quizState.questionData[quizState.activeQuestion + 1]) {
      quizDispatch({ type: 'INCREMENT_ACTIVE_QUESTION' })
      quizDispatch({ type: 'RESET_TIME_REMAINING' })
    } else {
      quizDispatch({type: 'FINISHED_QUIZ'})
    }
  }

  const isUncontrolledEntry = () => (quizState.questionData.length === 0 ? true : false)

  const renderQuestionsData = () => {
    // if (isUncontrolledEntry()) {
    //   return <Redirect to="/wrong" />
    // }

    return (
      <h3 className="title is-3">{quizState.questionData[quizState.activeQuestion].question}</h3>
    )
  }

  const handleResetButton = () => {
    quizDispatch({ type: 'RESET_TIME_REMAINING' })
    quizDispatch({ type: 'RESET_ACTIVE_QUESTION' })
    quizDispatch({ type: 'PUSH_PATH_TO_HISTORY', payload: history.location.pathname })
    quizDispatch({ type: 'RESET_QUIZ_STATE' })
    inputsDispatch({ type: 'RESET_INPUTS_VALUE' })

  }

  return (
    <>
      <TimeRemainingProgressBar
        millisecondsRemaining={quizState.millisecondsRemaining}
        max={maxTimeRemaining}
      />
      <AppContainer>
        {quizState.millisecondsRemaining}
        <h1 className="title">
          {quizState.activeQuestion + 1} / {initialState.numberOfQuestion}
        </h1>
        <QuizContainer className="card">
          <Header className="card-header">
            <div className="notification is-primary">
              {quizState.loading ? (
                <h3 className="title is-3">Loading. . .</h3>
              ) : (
                <h3 className="title is-3">
                  {quizState.questionData[quizState.activeQuestion].question}
                </h3>
              )}
            </div>
          </Header>
          <div className="card-content">
            <div className="content">
              {quizState.loading ? (
                <AnswerListElm className="subtitle is-3">Loading. . . </AnswerListElm>
              ) : (
                <List>{randerAnswerListElement()}</List>
              )}
            </div>
          </div>
        </QuizContainer>
        <ButtonContainer>
          <button onClick={handleNextButton} className="button is-primary is-large is-rounded">
            {quizState.questionData.length === quizState.activeQuestion + 1 ? 'Finish !' : 'Next !'}
          </button>
          <Link to="/preparingQuiz">
            <button onClick={handleResetButton} className="button is-danger is-large is-rounded">
              Back/ Reset Quiz
            </button>
          </Link>
          <h1 className="title">
            {quizState.activeQuestion + 1} / {initialState.numberOfQuestion}
          </h1>
        </ButtonContainer>
      </AppContainer>
      <progress
        className="progress is-info is-large"
        value={quizState.activeQuestion + 1}
        max={initialState.numberOfQuestion}
      ></progress>
    </>
  )
}
