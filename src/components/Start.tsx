import React from 'react'
import { TitleContainer } from '../styled/components/GlobalComponents'
import { Link } from 'react-router-dom'

export const Start: React.FC = () => {
  return (
    <TitleContainer>
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Question Master</h1>
            <h2 className="subtitle">let us check what you know about World</h2>
          </div>
        </div>
      </section>
      <Link to="/preparingQuiz">
        <button className="button is-primary is-large is-rounded">Prepare Quiz!</button>
      </Link>
    </TitleContainer>
  )
}
