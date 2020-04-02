import React, { useReducer, useState, useEffect } from 'react';
import { PrepareData } from '../components/PreparingQuiz/PreparingQuiz';

const QUIZ_STATE = {
    activeQuestion: 0,
    loading: true,
    error: '',
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
    shuffleAnswers: Array<string>, 
    questionData: QuestionData[],
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
            }
        case 'DECREMENT_ACTIVE_QUESTION':
            return {
                ...state,
                activeQuestion: (state.activeQuestion - 1)
            } 
        case 'NEW_ANSWERS_ARRAY':
            return {
                ...state,
                shuffleAnswers: action.payload
            }       
        default:
            return state
                
    }

}

export function useQuizReducer(preparingQuiz: PrepareData) {
    const [ state, dispatch ] = useReducer(reducer, QUIZ_STATE);

    useEffect(() => {
        if (preparingQuiz.numberOfQuestion != '') {
            const baseURL = `https://opentdb.com/api.php?amount=${preparingQuiz.numberOfQuestion}`
            getQuestions(baseURL)
        }
        
    }, []);

    const getQuestions = async (url: string) => {
        try {
          const response = await fetch(url)
          const questionsData = await response.json()
        //   console.log(questionsData)
        //   return setQuestionsData(questionsData.results), setStatus(false)
            dispatch({type: 'FETCH_SUCCESS', payload: questionsData.results})
        } catch (err) {
          dispatch({type: 'FETCH_ERROR'})
        }
      }


    return { state, dispatch }
}