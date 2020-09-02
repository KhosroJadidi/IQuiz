import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { TopScores } from './components/TopScores';
import {LoginRegister} from './components/LoginRegister'

import './custom.css'
import { QuizSession } from './components/QuizSession';

export class App extends Component {
  static displayName = App.name;
  constructor(props){
    super(props)
    window.appFunctions=this;
    this.state={
      token:"this is a token from thr app component.",
      userIsLoggedIn:false
    }
    this.updateLoggedInStatus=this.updateLoggedInStatus.bind(this);
    this.updateToken=this.updateToken.bind(this);
  } 

  updateLoggedInStatus(booleanStatus){
    this.setState({userIsLoggedIn:booleanStatus});
    console.log(this.state.userIsLoggedIn);
  }

  updateToken(token){
    this.setState({
      token:token
    });
  }


  
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
