import React, { useRef, useEffect } from 'react'
import { TitleContainer } from '../styled/components/GlobalComponents'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as Scene } from '../assets/scene.svg'
import gsap from 'gsap'

const SceneContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 75%;
`

const Box = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`

const StartContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  height: 50%;
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

      gsap.set([, person, torch, haze, questionMark], { autoAlpha: 0 })
      gsap.set(torch, { transformOrigin: '50% 100%' })
      gsap.set(haze, { transformOrigin: '10% 20%' })

      const timeLine = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

      timeLine
        .fromTo(person, { x: '+=400' }, { x: '-=400', autoAlpha: 1 })
        .fromTo(torch, { scaleY: 0 }, { duration: 0.6, autoAlpha: 1, scale: 1 })
        .fromTo(haze, { scale: 0.6 }, { duration: 0.3, scale: 1, autoAlpha: 1 })
        .to(questionMark, { duration: 3, autoAlpha: 1 })
    }
  }, [])

  return (
    <TitleContainer>
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
    </TitleContainer>
  )
}
