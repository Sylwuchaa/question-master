import React, { useReducer } from 'react';

const QUIZ_STATE = {
    activeQueestion: 0,
    questionData: [
        {
            category: null,
            type: null,
            difficullty: null,
            question: null,
            correct_answer: null,
            incorrect_answers: []
        }
    ]
}

type QuestionData = {
    category: string,
    type: string,
    difficullty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: Array<string>,
}

interface QUIZ_STATE {
    activeQueestion: number,
    questionData: QuestionData[],
}