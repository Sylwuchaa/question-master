import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as Scene } from '../assets/scene.svg'
import gsap from 'gsap'
import { Login } from '../auth/Login'

const SceneContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 75%;
`
const StartContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  height: 50%;
`
const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`
const StyledLoginContainer = styled.div`
  display: flex;
  width: 20%;
  height: 100%;
  flex-direction: row;
`

export const Start: React.FC = () => {
  const scene = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (scene.current != null) {
      const [elements] = scene.current.children

      const person = elements.querySelector('#person')
      const torch = elements.querySelector('#torch')
      const haze = elements.querySelector('#haze')
      const questionMark = elements.querySelector('#questionMark')

      if (haze != null) {
        gsap.set([...haze.children, person, torch, questionMark], { autoAlpha: 0 })
        gsap.set(torch, { transformOrigin: '50% 100%' })
        // gsap.set(haze, { transformOrigin: '10% 20%' })

        const timeLine = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

        timeLine
          .fromTo(person, { x: '+=400' }, { x: '-=400', autoAlpha: 1 })
          .fromTo(torch, { scaleY: 0 }, { duration: 0.6, autoAlpha: 1, scale: 1 }, '-=0.25')
          .fromTo(
            haze.children,
            { scale: 0.4 },
            { duration: 0.3, scale: 1, autoAlpha: 1, stagger: 0.1 }
          )
          .to(questionMark, { duration: 2, autoAlpha: 1 })
      }
    }

    return
  }, [])

  return (
    <StyledContainer>
      <StyledLoginContainer>
        <Login />
      </StyledLoginContainer>

      <StartContainer>
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
      </StartContainer>
      <SceneContainer ref={scene}>
        <Scene />
      </SceneContainer>
    </StyledContainer>
  )
}
