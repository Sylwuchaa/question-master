import { useReducer, useEffect } from 'react';
import { PrepareData } from '../components/PreparingQuiz/PreparingQuiz';

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
            incorrect_answers: []
        }
    ]
}

interface QuestionData {
    category: string,
    type: string,
    difficullty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: Array<string>,
}

interface QUIZ_STATE {
    activeQuestion: number,
    loading: boolean,
    error: string,
    millisecondsRemaining: number,
    shuffleAnswers: Array<string>,
    questionData: QuestionData[],
}

interface Action {

}


const reducer = (state: QUIZ_STATE, action: any) => {
    switch(action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                questionData: action.payload
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                loading: false,
                error: 'Something wants wrong!'
            };
        case 'INCREMENT_ACTIVE_QUESTION':
            return {
                ...state,
                activeQuestion: (state.activeQuestion + 1)
            };
        case 'DECREMENT_ACTIVE_QUESTION':
            return {
                ...state,
                activeQuestion: (state.activeQuestion - 1)
            };
        case 'NEW_ANSWERS_ARRAY':
            return {
                ...state,
                shuffleAnswers: action.payload
            };
        case 'START_TIME_REMAINING': 
            return {
                ...state,
                millisecondsRemaining: (state.millisecondsRemaining - 1)
            };
        case 'RESET_TIME_REMAINING':
        return {
            ...state,
            millisecondsRemaining: 1300
        }
        default:
            return state
                
    }

}

export function useQuizReducer(preparingQuiz: PrepareData) {
    const [ state, dispatch ] = useReducer(reducer, QUIZ_STATE);

    useEffect(() => {
        if (preparingQuiz.numberOfQuestion !== '') {
            const baseURL = `https://opentdb.com/api.php?amount=${preparingQuiz.numberOfQuestion}`
            getQuestions(baseURL)
        }
        
    }, [preparingQuiz]);

    const getQuestions = async (url: string) => {
        try {
          const response = await fetch(url)
          const questionsData = await response.json()
            dispatch({type: 'FETCH_SUCCESS', payload: questionsData.results})
        } catch (err) {
          dispatch({type: 'FETCH_ERROR'})
        }
      }

    return { state, dispatch }
}