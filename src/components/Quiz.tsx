import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AppContainer, ButtonContainer } from '../styled/components/GlobalComponents'
import { Link } from 'react-router-dom'
import { useQuizReducer } from '../hooks/useQuizReducer'
import { stat } from 'fs'

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 50%;
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

// type QuestionData = {
//   category: string
//   type: string
//   difficullty: string
//   question: string
//   correct_answer: string
//   incorrect_answers: Array<string>
// }

// type Data = QuestionData[]

export const Quiz: React.FC<Props> = ({ selectedFormOptions }) => {
  // const [loading, setStatus] = useState<boolean>(true)
  // const [questionsData, setQuestionsData] = useState<Data>()

  // useEffect(() => {
  //   prepareBaseUrl(selectedFormOptions)
  // }, [])

  // const prepareBaseUrl = (selectedFormOptions: FormOptions) => {
  //   console.log(selectedFormOptions)
  //   if (selectedFormOptions) {
  //     const baseURL = `https://opentdb.com/api.php?amount=${selectedFormOptions.numberOfQuestion}`
  //     getQuestions(baseURL)
  //   }
  //   return null
  // }

  // const getQuestions = async (url: string) => {
  //   try {
  //     const response = await fetch(url)
  //     const questionsData = await response.json()
  //     console.log(questionsData)
  //     return setQuestionsData(questionsData.results), setStatus(false)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const { state, dispatch } = useQuizReducer(selectedFormOptions)

  useEffect(() => {
    theShuffledArrayOfQuestions();
  }, [state.questionData])



  const theShuffledArrayOfQuestions = async () => {
    let arrayOfIncorrectAnswers = await state.questionData[state.activeQuestion].incorrect_answers
    console.log(arrayOfIncorrectAnswers)
    const correctAnswer = await state.questionData[state.activeQuestion].correct_answer

    arrayOfIncorrectAnswers = [...arrayOfIncorrectAnswers, ...correctAnswer]
    console.log('First' + arrayOfIncorrectAnswers)

    const shuffle = (array: Array<string>) => {
      var random = array.map(Math.random);
      array.sort(function(a, b) {
        return random[array.indexOf(a)] - random[array.indexOf(b)];
      });
    }

    return dispatch({
      type: 'NEW_ANSWERS_ARRAY',
      payload: arrayOfIncorrectAnswers.sort(() => Math.random() - 0.5),
    })
  }

  const randerAnswerListElement = () => {
    return state.shuffleAnswers.map((answer: string, index: number) => (
      <div className="notification is-warning">
        <AnswerListElm className="subtitle is-3">
          <Input id={`elem${index}`} className="is-primary" type="checkbox" />
          <Label htmlFor={`elem${index}`}> {answer}</Label>
        </AnswerListElm>
      </div>
    ))
  }

  const renderQuestionsData = () => {
    return <h3 className="title is-3">{state.questionData[state.activeQuestion].question}</h3>
  }

  return (
    <>
      <progress className="progress is-danger is-large" value={23} max="5000"></progress>
      <AppContainer>
        <h1 className="title">1/{selectedFormOptions.numberOfQuestion}</h1>
        <QuizContainer className="card">
          <Header className="card-header">
            <div className="notification is-primary">
              {state.loading ? 'Loading . . . ' : renderQuestionsData()}
            </div>
          </Header>
          <div className="card-content">
            <div className="content">
              <List>
                {randerAnswerListElement()}
                {/* <div className="notification is-warning">
                  <AnswerListElm className="subtitle is-3">
                    <Input id="first" className="is-primary" type="checkbox" />
                    <Label htmlFor="first"></Label>
                  </AnswerListElm>
                </div>
                <div className="notification is-warning">
                  <AnswerListElm className="subtitle is-3">
                    <Input id="second" type="checkbox" />
                    <Label htmlFor="second"> Coffee</Label>
                  </AnswerListElm>
                </div>
                <div className="notification is-warning">
                  <AnswerListElm className="subtitle is-3">
                    <Input id="third" type="checkbox" />
                    <Label htmlFor="third"> Coffee</Label>
                  </AnswerListElm>
                </div>
                <div className="notification is-warning">
                <AnswerListElm className="subtitle is-3">
                  <Input id="third" type="checkbox" />
                  <Label htmlFor="third"> Coffee</Label>
                </AnswerListElm>
              </div> */}
              </List>
            </div>
          </div>
        </QuizContainer>
        <ButtonContainer>
          <Link to="/preparingQuiz">
            <button className="button is-primary is-large is-rounded">Next !</button>
          </Link>
        </ButtonContainer>
        <progress
          className="progress is-success is-medium"
          value={1}
          max={selectedFormOptions.numberOfQuestion}
        ></progress>
      </AppContainer>
    </>
  )
}
