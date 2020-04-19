import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../App'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as Back } from '../../assets/return.svg'
import { MenuContainer, MenuButton } from '../../styled/components/GlobalComponents'

export const SummaryContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 90%;
  flex-direction: column;
  margin-right: 10%;
  justify-content: space-around;
  align-items: center;
`
export const SummaryElement = styled.div`
  display: flex;
  height: 15%;
  min-width: 25%;
  margin: 1rem 0 1rem 0;
`
export const SectionSummaryElement = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
`
export const Title = styled.h1`
  text-align: center;
  font-size: 1.7rem;
  font-weight: 500;
`
export const Subtitle = styled.h2`
  font-size: 1.7rem;
  text-align: center;
  font-weight: bold;
`
const SummaryViewContianer = styled.div`
  display: flex;  
  flex-direction: row;
`
export const Summary: React.FC = () => {
  const globalContext = useContext(GlobalContext)
  const { quizState, quizDispatch, initialState } = globalContext
  const history = useHistory()

  useEffect(() => {
    if (quizState.lastPathHistory === null) {
      history.push('/wrong')
      quizDispatch({ type: 'PUSH_PATH_TO_HISTORY', payload: history.location.pathname })
    }
  }, [])

  return (
    <>
    <SummaryViewContianer>
      <MenuContainer>
        <MenuButton>
          <Back onClick={() => history.push('/preparingQuiz')} />
        </MenuButton>
      </MenuContainer>
      <SummaryContainer>
        <SummaryElement>
          <SectionSummaryElement className="hero is-info">
            <div className="hero-body">
              <div className="container">
                <Title className="title">Your's Score:</Title>
                <Subtitle className="subtitle">{quizState.score}</Subtitle>
              </div>
            </div>
          </SectionSummaryElement>
        </SummaryElement>
        <SummaryElement>
          <SectionSummaryElement className="hero is-success">
            <div className="hero-body">
              <div className="container">
                <Title className="title">Correct Answers:</Title>
                <Subtitle className="subtitle">Primary subtitle</Subtitle>
              </div>
            </div>
          </SectionSummaryElement>
        </SummaryElement>
        <SummaryElement>
          <SectionSummaryElement className="hero is-danger">
            <div className="hero-body">
              <div className="container">
                <Title className="title">Incorrect Answers:</Title>
                <Subtitle className="subtitle">Primary subtitle</Subtitle>
              </div>
            </div>
          </SectionSummaryElement>
        </SummaryElement>
        <SummaryElement>
          <SectionSummaryElement className="hero is-warning">
            <div className="hero-body">
              <div className="container">
                <Title className="title">Number of questions:</Title>
                <Subtitle className="subtitle">{initialState.numberOfQuestion}</Subtitle>
              </div>
            </div>
          </SectionSummaryElement>
        </SummaryElement>
      </SummaryContainer>
      </SummaryViewContianer>
    </>
  )
}
