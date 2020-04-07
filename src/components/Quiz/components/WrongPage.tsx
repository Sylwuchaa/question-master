import React, { useEffect, useState } from 'react'
import { TitleContainer } from '../../../styled/components/GlobalComponents'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'

const H2Styled = styled.h2`
  text-align: center;
`
const H1Styled = styled(H2Styled)`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.125;
`

export const WrongPages: React.FC = () => {
  const [time, counterDown] = useState<number>(3)
  const redirectTimeDown = () => {
    return counterDown(time - 1)
  }

  useEffect(() => {
    const timer = setInterval(redirectTimeDown, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [time])

  return (
    <TitleContainer>
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Ohh sorry :(</h1>
            <h2 className="subtitle">You came here by accident...</h2>
            <h2 className="subtitle">You'll be taken to the quiz wizard</h2>
            <H2Styled className="subtitle">automatical for</H2Styled>
            <H1Styled className="subtitle">{time}</H1Styled>
            {time === 0 && <Redirect to="/preparingQuiz" />}
          </div>
        </div>
      </section>
      <Link to="/preparingQuiz">
        <button className="button is-danger is-large is-rounded">Back to prepare</button>
      </Link>
    </TitleContainer>
  )
}
