import React, { useState, useReducer, ChangeEvent } from 'react'
import styled from 'styled-components'
import { SelectCategory } from './components/SelectCategory'
import { AppContainer, ButtonContainer } from '../../styled/components/GlobalComponents'
import { Quiz } from '../Quiz'

const Input = styled.input`
  text-align: center;
  width: 30%;
`
const Label = styled.label`
  padding: 5px;
  font-size: 1.4rem;
  font-weight: 400;
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0 15px;
  width: 30%;
`
const SelectInput = styled.select`
  width: 100%;
  font-size: 1rem;
`
const SelectInputContainer = styled.div`
  width: 100%;
  font-size: 1rem;
  text-align: center;
  text-align-last: center;
`
export interface PrepareData {
  numberOfQuestion: string
  difficulty: string
  typeOfQuiz: string
  selectedCategory: string
}

const INITIAL_STATE = {
  numberOfQuestion: '',
  difficulty: '',
  typeOfQuiz: '',
  selectedCategory: '',
}

const inputsReducer = (state: PrepareData, { field, value }: any) => {
  return {
    ...state,
    [field]: value,
  }
}

export const PreparingQuiz: React.FC = () => {

  const [inputsValue, dispatch] = useReducer(inputsReducer, INITIAL_STATE)
  const handleOnChangeInputs = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch({ field: evt.target.name, value: evt.target.value })
  }
  const [showQuiz, setShowQuizStatus] = useState<boolean>(false)

  return (
    <>
      {!showQuiz && (
        <AppContainer>
        <h1 className="title">Prepare Your Quiz !</h1>
        <Label htmlFor="questionNumber">Select number of question/s:</Label>
        <Input
          name="numberOfQuestion"
          className="input is-info"
          id="questionNumber"
          type="number"
          min="1"
          max="50"
          placeholder="Between 1 to 50"
          value={inputsValue.numberOfQuestion}
          onChange={handleOnChangeInputs}
          required={true}
        />
        <InputContainer>
          <SelectCategory
            handleOnChangeCategory={handleOnChangeInputs}
            categoryValue={inputsValue.selectedCategory}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="difficulty">Select Difficulty:</Label>
          <SelectInputContainer className="select is-info">
            <SelectInput
              value={inputsValue.difficulty}
              id="difficulty"
              onChange={handleOnChangeInputs}
              name="difficulty"
            >
              <option>Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </SelectInput>
          </SelectInputContainer>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="type">Select Type:</Label>
          <SelectInputContainer className="select is-info">
            <SelectInput
              id="type"
              onChange={handleOnChangeInputs}
              value={inputsValue.typeOfQuiz}
              name="typeOfQuiz"
            >
              <option>Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </SelectInput>
          </SelectInputContainer>
        </InputContainer>
        <ButtonContainer>
            <button
              onClick={() => setShowQuizStatus(true)}
              className="button is-primary is-large is-rounded">
              Let's Start !
            </button>
        </ButtonContainer>
      </AppContainer>
      )}
      {showQuiz && (
        <Quiz selectedFormOptions={inputsValue} />
      )}
    </>
  )
}
