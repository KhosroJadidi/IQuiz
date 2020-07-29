import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { TopScores } from './components/TopScores';
import {LoginRegister} from './components/LoginRegister'

import './custom.css'
import { QuizSession } from './components/QuizSession';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (      
      <Layout>
        <Route exact path='/' component={Home}/>
        <Route exact path='/quiz' component={QuizSession}/>
        <Route exact path='/top' component={TopScores}/>
        <Route exact path='/login' component={LoginRegister}/>
      </Layout>
    );
  }
}
