import React from 'react'
import { Start } from './components/Start'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { PreparingQuiz } from './components/PreparingQuiz/PreparingQuiz';
import { Quiz } from './components/Quiz';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Start} />
      <Route path='/preparingQuiz' component={PreparingQuiz} />
      <Route path='/quiz' component={Quiz} />
    </Router>
  )
}

export default App;
