import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import {TopScores} from './components/TopScores';
import {LoginRegister} from './components/LoginRegister'

import './custom.css'
import {QuizSession} from './components/QuizSession';

export class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props)
        window.appFunctions = this;
        this.state = {
            token: "",
            userIsLoggedIn: false,
            user: ""
        }
        this.updateLoggedInStatus = this.updateLoggedInStatus.bind(this);
        this.updateToken = this.updateToken.bind(this);
    }

    updateLoggedInStatus(booleanStatus) {
        this.setState({userIsLoggedIn: booleanStatus});
    }

    async updateToken(token) {
        await this.setState({
            token: token
        });
    }

    async componentDidMount() {
        await this.checkAuthCookie();
        setTimeout(()=>console.log(this.state),150)
    }

    checkAuthCookie() {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:53134/LoginStatus/checkLogin", requestOptions)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then((json) => {
                if (json.value.token !== "" && json.value.user !== "") {
                    this.setState({
                        token: json.value.token,
                        user: json.value.user,
                        userIsLoggedIn:true
                    })
                }else{
                    this.setState({
                        token: "",
                        user: "",
                        userIsLoggedIn:false
                    })
                }

            })
            .catch(error => console.log('error', error));
    }

    render() {
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
