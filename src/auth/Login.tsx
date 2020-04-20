import React from 'react'
import styled from 'styled-components'

const StyledButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 25%;
  margin: 2rem 0 0 2rem;
  border: 2px solid;
  border-color: ${(props) => props.theme.colors.lightgray};
  border-radius: 15%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const LoginButton = styled.button`
  display: flex;
  width: 80%;
  height: 25%;
`
const TitleLogin = styled.div`
  display: flex;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`
const StyledBetweenContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const HorizontalLine = styled.hr`
    display: flex;
    color: ${(props) => props.theme.colors.lightgray};
    background-color: ${(props) => props.theme.colors.lightgray};
    height: 2px;
    width: 4rem;
    margin: 1rem .5rem;
`

export const Login: React.FC = () => {
  return (
    <StyledButtonWrapper>
      <TitleLogin>Sign in with:</TitleLogin>
      <LoginButton className="button is-rounded is-link">Facebook</LoginButton>
      <StyledBetweenContainer>
        <HorizontalLine />
        or
        <HorizontalLine />
      </StyledBetweenContainer>
      <LoginButton className="button is-rounded is-dark">Github</LoginButton>
    </StyledButtonWrapper>
  )
}
