import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AppContainer, ButtonContainer } from '../styled/components/GlobalComponents'
import { Link } from 'react-router-dom'
import { useQuizReducer } from '../hooks/useQuizReducer'

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
type FormOptions = {
  numberOfQuestion: string
  difficulty: string
  typeOfQuiz: string
  selectedCategory: string
}
interface Props {
  selectedFormOptions: FormOptions
}

export const Quiz: React.FC<Props> = ({ selectedFormOptions }) => {
  const { state, dispatch } = useQuizReducer(selectedFormOptions)

  useEffect(() => {
    theShuffledArrayOfAnswers()
  }, [state.questionData, state.activeQuestion])

  useEffect(() => {
    setTimeout(() => {
      if (state.millisecondsRemaining >= 0) {
        return dispatch({type: 'START_TIME_REMAINING'})
      }
      return null;
    }, 1)
  }, [state.millisecondsRemaining, state.activeQuestion])

  const theShuffledArrayOfAnswers = async () => {
    let arrayOfIncorrectAnswers = await state.questionData[state.activeQuestion].incorrect_answers
    const correctAnswer = await state.questionData[state.activeQuestion].correct_answer

    arrayOfIncorrectAnswers = [...arrayOfIncorrectAnswers, correctAnswer]

    return dispatch({
      type: 'NEW_ANSWERS_ARRAY',
      payload: arrayOfIncorrectAnswers.sort(() => Math.random() - 0.5),
    })
  }

  const randerAnswerListElement = () => {
    console.log(state.shuffleAnswers)
    return state.shuffleAnswers.map((answer: string, index: number) => (
      <div key={answer + index} className="notification is-warning is-loading">
        <AnswerListElm className="subtitle is-3">
          <Input id={`elem${index}`} className="is-primary" type="checkbox" />
          <Label htmlFor={`elem${index}`}> {answer}</Label>
        </AnswerListElm>
      </div>
    ))
  }

  const handleNextButton = () => {
    console.log(state.activeQuestion)
    dispatch({ type: 'INCREMENT_ACTIVE_QUESTION' })
  }

  const renderQuestionsData = () => {
    return <h3 className="title is-3">{state.questionData[state.activeQuestion].question}</h3>
  }

  return (
    <>
      <progress className="progress is-danger is-large" value={state.millisecondsRemaining} max="1300"></progress>
      <AppContainer>
        <h1 className="title">
          {state.activeQuestion + 1}/{selectedFormOptions.numberOfQuestion}
        </h1>
        <QuizContainer className="card">
          <Header className="card-header">
            <div className="notification is-primary">
              {state.loading ? <h3 className="title is-3">Loading. . .</h3> : renderQuestionsData()}
            </div>
          </Header>
          <div className="card-content">
            <div className="content">
              {state.loading ? (
                <AnswerListElm className="subtitle is-3">Loading. . . </AnswerListElm>
              ) : (
                <List>{randerAnswerListElement()}</List>
              )}
            </div>
          </div>
        </QuizContainer>
        <ButtonContainer>
          <Link to="/preparingQuiz">
            <button onClick={handleNextButton} className="button is-primary is-large is-rounded">
              Next !
            </button>
          </Link>
        </ButtonContainer>
      </AppContainer>
      <progress
          className="progress is-success is-large"
          value={state.activeQuestion + 1}
          max={selectedFormOptions.numberOfQuestion}
        ></progress>
    </>
  )
}
