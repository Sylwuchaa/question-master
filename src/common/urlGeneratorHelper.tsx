import { INITIAL_STATE } from "../reducer/useGlobalReducer"

export const urlGeneratorHelper = (initialState: INITIAL_STATE ) => {
    if (initialState.selectedCategory !== '' && initialState.difficulty === '' && initialState.typeOfQuiz === '') {
        const url = `https://opentdb.com/api.php?amount=${initialState.numberOfQuestion}&category=${initialState.selectedCategory}`
         
        return(url)
    }

    if (initialState.selectedCategory === '' && initialState.difficulty !== '' && initialState.typeOfQuiz === '') {
        const url = `https://opentdb.com/api.php?amount=${initialState.numberOfQuestion}&difficulty=${initialState.difficulty}`

        return(url)
    }

    if (initialState.selectedCategory === '' && initialState.difficulty === '' && initialState.typeOfQuiz !== '') { 
        const url = `https://opentdb.com/api.php?amount=${initialState.numberOfQuestion}&type=${initialState.typeOfQuiz}`

        return(url)
    }

    if (initialState.selectedCategory !== '' && initialState.difficulty !== '' && initialState.typeOfQuiz !== '') {
        const url = `https://opentdb.com/api.php?amount=${initialState.numberOfQuestion}&category=${initialState.selectedCategory}&difficulty=${initialState.difficulty}&type=${initialState.typeOfQuiz}`
    
        return(url)
    }

    if (initialState.selectedCategory !== '' && initialState.difficulty === '' && initialState.typeOfQuiz !== '') {
        const url = `https://opentdb.com/api.php?amount=${initialState.numberOfQuestion}&category=${initialState.selectedCategory}&type=${initialState.typeOfQuiz}`
   
        return(url)
    }

    if (initialState.selectedCategory === '' && initialState.difficulty !== '' && initialState.typeOfQuiz !== '') {
        const url = `https://opentdb.com/api.php?amount=${initialState.numberOfQuestion}&difficulty=${initialState.difficulty}&type=${initialState.typeOfQuiz}`
    
        return(url)
    }

    if (initialState.selectedCategory !== '' && initialState.difficulty !== '' && initialState.typeOfQuiz === '') {
        const url = `https://opentdb.com/api.php?amount=${initialState.numberOfQuestion}&category=${initialState.selectedCategory}&difficulty=${initialState.difficulty}`

        return(url)
    }

    return `https://opentdb.com/api.php?amount=${initialState.numberOfQuestion}`
}