import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../App'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

export const SummaryContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
`

export const SummaryElement = styled.div`
  display: flex;
  height: 15%;
  width: 20%;
  margin: 2rem 0 2rem 0;
`
export const SectionSummaryElement = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
`
export const Title = styled.h1`
  font-size: 2.5rem;
`

export const Subtitle = styled.h2`
  font-size: 2rem;
`
export const Summary: React.FC = () => {
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

  useEffect(() => {
    if (quizState.lastPathHistory === null) {
      history.push('/wrong')
      quizDispatch({ type: 'PUSH_PATH_TO_HISTORY', payload: history.location.pathname })
    }
  }, [])

  return (
    <>
      <SummaryContainer>
        <SummaryElement>
          <SectionSummaryElement className="hero is-info">
            <div className="hero-body">
              <div className="container">
                <Title className="title">Your's Score</Title>
                <Subtitle className="subtitle">{quizState.score}</Subtitle>
              </div>
            </div>
          </SectionSummaryElement>
        </SummaryElement>
        <SummaryElement>
          <SectionSummaryElement className="hero is-success">
            <div className="hero-body">
              <div className="container">
                <Title className="title">Correct Answers</Title>
                <Subtitle className="subtitle">Primary subtitle</Subtitle>
              </div>
            </div>
          </SectionSummaryElement>
        </SummaryElement>
        <SummaryElement>
          <SectionSummaryElement className="hero is-danger">
            <div className="hero-body">
              <div className="container">
                <Title className="title">Incorrect Answers</Title>
                <Subtitle className="subtitle">Primary subtitle</Subtitle>
              </div>
            </div>
          </SectionSummaryElement>
        </SummaryElement>
        <SummaryElement>
          <SectionSummaryElement className="hero is-warning">
            <div className="hero-body">
              <div className="container">
                <Title className="title">Number of questions</Title>
                <Subtitle className="subtitle">{initialState.numberOfQuestion}</Subtitle>
              </div>
            </div>
          </SectionSummaryElement>
        </SummaryElement>
      </SummaryContainer>
    </>
  )
}