import { useReducer, useEffect } from 'react'

export interface INITIAL_STATE {
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

const QUIZ_STATE = {
  activeQuestion: 0,
  loading: true,
  error: '',
  millisecondsRemaining: 1300,
  shuffleAnswers: [],
  questionData: [
    {
      category: '',
      type: '',
      difficullty: '',
      question: '',
      correct_answer: '',
      incorrect_answers: [],
    },
  ],
}
interface QuestionData {
  category: string
  type: string
  difficullty: string
  question: string
  correct_answer: string
  incorrect_answers: Array<string>
}

interface QUIZ_STATE {
  activeQuestion: number
  loading: boolean
  error: string
  millisecondsRemaining: number
  shuffleAnswers: Array<string>
  questionData: QuestionData[]
}

const inputsReducer = (state: INITIAL_STATE, { field, value }: any) => {
  return {
    ...state,
    [field]: value,
  }
}

const quizReducer = (state: QUIZ_STATE, action: any) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        questionData: action.payload,
      }
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: 'Something wants wrong!',
      }
    case 'INCREMENT_ACTIVE_QUESTION':
      return {
        ...state,
        activeQuestion: state.activeQuestion + 1,
      }
    case 'DECREMENT_ACTIVE_QUESTION':
      return {
        ...state,
        activeQuestion: state.activeQuestion - 1,
      }
    case 'NEW_ANSWERS_ARRAY':
      return {
        ...state,
        shuffleAnswers: action.payload,
      }
    case 'START_TIME_REMAINING':
      return {
        ...state,
        millisecondsRemaining: state.millisecondsRemaining - 1,
      }
    case 'RESET_TIME_REMAINING':
      return {
        ...state,
        millisecondsRemaining: 1300,
      }
    default:
      return state
  }
}

export function useGlobalReducer() {
  const [initialState, inputsDispatch] = useReducer(inputsReducer, INITIAL_STATE)
  const [quizState, quizDispatch] = useReducer(quizReducer, QUIZ_STATE)

  useEffect(() => {
    const baseURL = `https://opentdb.com/api.php?amount=${initialState.numberOfQuestion}`
    getQuestions(baseURL)
  }, [initialState.numberOfQuestion])

  const getQuestions = async (url: string) => {
    try {
      const response = await fetch(url)
      const questionsData = await response.json()
      quizDispatch({ type: 'FETCH_SUCCESS', payload: questionsData.results })
    } catch (err) {
      quizDispatch({ type: 'FETCH_ERROR' })
    }
  }

  return { quizState, initialState, quizDispatch, inputsDispatch }
}