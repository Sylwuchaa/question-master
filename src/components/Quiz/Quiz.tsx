import React, { useEffect, useContext, useRef, ChangeEvent } from 'react'
import styled from 'styled-components'
import { ButtonContainer, PrepareContainer } from '../../styled/components/GlobalComponents'
import { GlobalContext } from '../../App'
import { Link, useHistory } from 'react-router-dom'
import { TimeRemainingProgressBar } from '../Quiz/components/TimeRemainingProgressBar'

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
  width: 100%;
  min-height: 20%;
  max-height: 20%;
`
const Input = styled.input`
  width: 30px;
  height: 30px;
  background: ${props => props.theme.colors.white};;
  border-radius: 10px;
  cursor: pointer;
`
const Label = styled.label`
  cursor: pointer;
`
const Info = styled.div`
  font-weight: bold;
  margin: 0;
`
const Question = styled.div`
  font-size: 1.5rem;
`
export type QuizConfig = '1500' | ('500' & string)
const maxTimeRemaining: QuizConfig = '500'

export const Quiz: React.FC = () => {
  const globalContext = useContext(GlobalContext)
  const {
    quizState,
    quizDispatch,
    initialState,
    inputsDispatch,
    answerState,
    answerDispatch,
  } = globalContext
  const history = useHistory()
  const checkbox = useRef(null)

  useEffect(() => {
    if (quizState.lastPathHistory === null) {
      history.push('/wrong')
    } else if (quizState.questionData[quizState.activeQuestion].incorrect_answers)
      theShuffledArrayOfAnswers()
  }, [quizState.questionData, quizState.activeQuestion, quizState.finished])

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

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    answerDispatch({ answer: evt.target.value, value: evt.target.checked, type: 'SET_ANSWER' })
  }

  const calculatePoint = () => {
    const correctAnswer = quizState.questionData[quizState.activeQuestion].correct_answer
    if (answerState.answers[0] === correctAnswer && answerState.answers[1] === true) {
      return quizDispatch({ type: 'INCREMENT_SCORE' })
    }

    return quizDispatch({ type: 'DECREMENT_SCORE' })
  }

  const theShuffledArrayOfAnswers = () => {
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
          <Input
            id={`elem${index}`}
            className="is-primary"
            ref={checkbox}
            value={answer}
            onChange={handleChange}
            type="checkbox"
          />
          <Label htmlFor={`elem${index}`}> {answer}</Label>
        </AnswerListElm>
      </div>
    ))
  }

  const handleNextButton = () => {
    if (quizState.questionData[quizState.activeQuestion + 1]) {
      return (
        calculatePoint(),
        quizDispatch({ type: 'INCREMENT_ACTIVE_QUESTION' }),
        quizDispatch({ type: 'RESET_TIME_REMAINING' })
      )
    }

    return (
      quizDispatch({ type: 'PUSH_PATH_TO_HISTORY', payload: history.location.pathname }),
      history.push('/summary')
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
      <PrepareContainer>
        <TimeRemainingProgressBar
          color={"is-danger"}
          millisecondsRemaining={quizState.millisecondsRemaining}
          max={maxTimeRemaining}
        />
        <h1 className="title">
          {quizState.activeQuestion + 1} / {initialState.numberOfQuestion}
        </h1>
        <Info className="notification is-info">
          #{quizState.questionData[quizState.activeQuestion].category} Difficulty: {quizState.questionData[quizState.activeQuestion].difficulty}
        </Info>
        <Header className="card-header">
          <div className="notification is-primary">
            {quizState.loading ? (
              <h3 className="title is-3">Loading. . .</h3>
            ) : (
              <Question>
                {quizState.questionData[quizState.activeQuestion].question}
              </Question>
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
        <ButtonContainer>
          <button
            type="submit"
            onClick={handleNextButton}
            className="button is-primary is-large is-rounded"
          >
            {quizState.questionData.length === quizState.activeQuestion + 1 ? 'Finish !' : 'Next !'}
          </button>
          <Link to="/preparingQuiz">
            <button onClick={handleResetButton} className="button is-danger is-large is-rounded">
              Back/ Reset Quiz
            </button>
          </Link>
        </ButtonContainer>
        <TimeRemainingProgressBar
          color={"is-info"}
          millisecondsRemaining={quizState.activeQuestion + 1}
          max={initialState.numberOfQuestion}
        />
      </PrepareContainer>
    </>
  )
}
