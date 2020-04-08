import React, { ChangeEvent, useContext, useRef } from 'react'
import styled from 'styled-components'
import { SelectCategory } from './components/SelectCategory'
import { AppContainer, ButtonContainer } from '../../styled/components/GlobalComponents'
import { GlobalContext } from '../../App'
import { useHistory } from 'react-router-dom'

const Input = styled.input`
  text-align: center;
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
  const { quizDispatch, initialState, inputsDispatch } = globalContext
  const numberOfQuestionInput = useRef<HTMLInputElement>(null)
  const history = useHistory()


  const handleOnChangeInputs = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    inputsDispatch({ field: evt.target.name, value: evt.target.value, type: 'SET_INPUT_VALUE' })
  }

  const handleResetFormInputsValue = () => {
    inputsDispatch({ type: 'RESET_INPUTS_VALUE' })
  }

  const handleValidate = () => {
    if (Number(initialState.numberOfQuestion) > 0 && Number(initialState.numberOfQuestion) < 52) {
      return (
        history.push('/quiz'),
        quizDispatch({ type: 'PUSH_PATH_TO_HISTORY', payload: history.location.pathname })
      )
    }

    return handleResetFormInputsValue()
  }

  return (
    <AppContainer>
      <h1 className="title">Prepare Your Quiz !</h1>
      
      <Label htmlFor="questionNumber">Select number of question/s:</Label>
      <form>
      <Input
        ref={numberOfQuestionInput}
        name="numberOfQuestion"
        className="input is-info"
        id="questionNumber"
        type="number"
        min="1"
        max="50"
        placeholder="Between 1 to 50"
        value={initialState.numberOfQuestion}
        onChange={handleOnChangeInputs}
        required={true}
      />
      <InputContainer>
        <SelectCategory
          handleOnChangeCategory={handleOnChangeInputs}
          categoryValue={initialState.selectedCategory}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="difficulty">Select Difficulty:</Label>
        <SelectInputContainer className="select is-info">
          <SelectInput
            value={initialState.difficulty}
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
            value={initialState.typeOfQuiz}
            name="typeOfQuiz"
          >
            <option>Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </SelectInput>
        </SelectInputContainer>
      </InputContainer>

      <ButtonContainer>
        <button onClick={handleValidate} className="button is-primary is-large is-rounded">
          Let's Start !
        </button>
        <button
          onClick={handleResetFormInputsValue}
          className="button is-danger is-large is-rounded"
        >
          Reset Inputs
        </button>
      </ButtonContainer>
      </form>
    </AppContainer>
  )
}
