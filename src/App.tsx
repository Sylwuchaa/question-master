import React from 'react'
import { Start } from './components/Start'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PreparingQuiz } from './components/PreparingQuiz/PreparingQuiz'
import { Quiz } from './components/Quiz/Quiz'
import { useGlobalReducer } from './app/useGlobalReducer'
import { WrongPages } from './components/Quiz/components/WrongPage'

export const GlobalContext = React.createContext<any>({})

function App() {
  const { quizState, initialState, quizDispatch, inputsDispatch, answerState, answerDispatch, } = useGlobalReducer()
  return (
    <Router>
      <Switch>
        <GlobalContext.Provider value={{ quizState, initialState, quizDispatch, inputsDispatch, answerState, answerDispatch }}>
          <Route exact path="/" component={Start} />
          <Route path="/preparingQuiz" component={PreparingQuiz} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/wrong" component={WrongPages} />
        </GlobalContext.Provider>
      </Switch>
    </Router>
  )
}

export default App
