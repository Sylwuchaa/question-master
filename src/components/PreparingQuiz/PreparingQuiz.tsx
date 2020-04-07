import React, { ChangeEvent, useContext } from 'react'
import styled from 'styled-components'
import { SelectCategory } from './components/SelectCategory'
import { AppContainer, ButtonContainer } from '../../styled/components/GlobalComponents'
import { GlobalContext } from '../../App'
import { Link } from 'react-router-dom'

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

export const PreparingQuiz: React.FC = () => {
  const globalContext = useContext(GlobalContext)

  const handleOnChangeInputs = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    globalContext.inputsDispatch({ field: evt.target.name, value: evt.target.value })
  }

  return (
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
        value={globalContext.initialState.numberOfQuestion}
        onChange={handleOnChangeInputs}
        required={true}
      />
      <InputContainer>
        <SelectCategory
          handleOnChangeCategory={handleOnChangeInputs}
          categoryValue={globalContext.initialState.selectedCategory}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="difficulty">Select Difficulty:</Label>
        <SelectInputContainer className="select is-info">
          <SelectInput
            value={globalContext.initialState.difficulty}
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
            value={globalContext.initialState.typeOfQuiz}
            name="typeOfQuiz"
          >
            <option>Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </SelectInput>
        </SelectInputContainer>
      </InputContainer>
      <ButtonContainer>
        <Link to="/quiz" className="button is-primary is-large is-rounded">
          Let's Start !
        </Link>
      </ButtonContainer>
    </AppContainer>
  )
}
