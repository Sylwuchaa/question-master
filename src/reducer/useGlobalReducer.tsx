import { useReducer, useEffect } from 'react'
import { urlGeneratorHelper } from '../common/urlGeneratorHelper'

export interface INITIAL_STATE {
  numberOfQuestion: string
  difficulty: string
  typeOfQuiz: string
  selectedCategory: string
  answers: Array<Answer>
}

const INITIAL_STATE = {
  numberOfQuestion: '',
  difficulty: '',
  typeOfQuiz: '',
  selectedCategory: '',
  answers: [],
}

const QUIZ_STATE = {
  activeQuestion: 0,
  loading: true,
  finished: false,
  error: '',
  score: 0,
  answers: [
    {
      answer: null
    }
  ],
  lastPathHistory: null,
  millisecondsRemaining: 0,
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
  finished: boolean
  score: number
  answers: Answer[]
  error: string
  lastPathHistory: string | null
  millisecondsRemaining: number
  shuffleAnswers: Array<string>
  questionData: QuestionData[]
}

interface Answer {
  answer: boolean | null
}

const ANSWERS_STATE: ANSWERS_STATE = {
  answers: []
}

type ANSWERS_STATE = {
  answers: Array<string | boolean>
}
const answerReducer = (state: ANSWERS_STATE, { answer, value, type }: any) => {
  switch (type) {
    case 'SET_ANSWER':
      return {
        ...state,
        state: ANSWERS_STATE.answers.unshift(answer, value),
      }
    case 'RESET_ANSWER':
      return {
        ...state,
        state: ANSWERS_STATE.answers = []
      }
    default:
      return state
  }
}

const inputsReducer = (state: INITIAL_STATE, { field, value, type }: any) => {
  switch (type) {
    case 'SET_INPUT_VALUE':
      return {
        ...state,
        [field]: value,
      }
    case 'RESET_INPUTS_VALUE':
      return {
        ...state,
        numberOfQuestion: '',
        difficulty: '',
        typeOfQuiz: '',
        selectedCategory: '',
      }
    default:
      return state
  }
}

const quizReducer = (state: QUIZ_STATE, action: any) => {
  switch (action.type) {
    case 'FETCH_PENDING':
      return {
        ...state,
        loading: true,
      }
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
    case 'INCREMENT_SCORE':
      return {
        ...state,
        score: state.score + 1,
      }
    case 'DECREMENT_SCORE':
      return {
        ...state,
        score: state.score - 1,
      }
      case 'SET_ANSWER':
      return {
        ...state,
        state: ANSWERS_STATE.answers.unshift(action.payload),
      }
    case 'DECREMENT_ACTIVE_QUESTION':
      return {
        ...state,
        activeQuestion: state.activeQuestion - 1,
      }
    case 'RESET_ACTIVE_QUESTION':
      return {
        ...state,
        activeQuestion: state.activeQuestion = 0,
      }
    case 'NEW_ANSWERS_ARRAY':
      return {
        ...state,
        shuffleAnswers: action.payload,
      }
    case 'START_TIME_REMAINING':
      return {
        ...state,
        millisecondsRemaining: state.millisecondsRemaining + 1,
      }
    case 'RESET_TIME_REMAINING':
      return {
        ...state,
        millisecondsRemaining: state.millisecondsRemaining = 0,
      }
    case 'PUSH_PATH_TO_HISTORY':
      return {
        ...state,
        lastPathHistory: action.payload,
      }
    case 'FINISHED_QUIZ':
      return {
        ...state,
        finished: true,
      }
    case 'RESET_QUIZ_STATE':
      return {
        ...state,
        state: QUIZ_STATE,
      }
    default:
      return state
  }
}

export function useGlobalReducer() {
  const abortController = new AbortController()
  const signal = abortController.signal
  const [initialState, inputsDispatch] = useReducer(inputsReducer, INITIAL_STATE)
  const [quizState, quizDispatch] = useReducer(quizReducer, QUIZ_STATE)
  const [answerState, answerDispatch] = useReducer(answerReducer, ANSWERS_STATE)

  useEffect(() => {
    getQuestions(urlGeneratorHelper(initialState))

    return () => {
      abortController.abort()
    }
  }, [initialState])

  const getQuestions = async (url: any) => {
    try {
      quizDispatch({ type: 'FETCH_PENDING' })
      const response = await fetch(url, { signal: signal })
      const questionsData = await response.json()
      quizDispatch({ type: 'FETCH_SUCCESS', payload: questionsData.results })
    } catch (err) {
      quizDispatch({ type: 'FETCH_ERROR' })
    }
  }

  return { quizState, initialState, quizDispatch, inputsDispatch, answerState, answerDispatch }
}
