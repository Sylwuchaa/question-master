import React from 'react';
import { Start } from './components/Start'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { PreparingQuiz } from './components/PreparingQuiz/PreparingQuiz';
import { Quiz } from './components/Quiz';
import { useGlobalReducers } from './hooks/useQuizReducer';

export const GlobalContext = React.createContext<any>({})


function App() {
  const { quizState, initialState, quizDispatch, inputsDispatch } = useGlobalReducers()
  return (
    <Router>
      <Switch>
        <GlobalContext.Provider value={{ quizState, initialState, quizDispatch, inputsDispatch }}>
        <Route exact path='/' component={Start} />
        <Route path='/preparingQuiz'/>
          <PreparingQuiz  />
        <Route path='/quiz'>
          <Quiz />
        </Route>
        </GlobalContext.Provider>
      </Switch>
    </Router>
  )
}

export default App;
 