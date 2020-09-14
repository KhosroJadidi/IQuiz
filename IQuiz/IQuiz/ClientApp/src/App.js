import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import {TopScores} from './components/TopScores';
import {LoginRegister} from './components/LoginRegister'
import './custom.css'
import {QuizSession} from './components/QuizSession';


//Fetch settings
const applicationUrl = "http://localhost:53134";
const route = "LoginStatus/checkLogin";

export class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props)
        this.state = {
            token: "",
            userIsLoggedIn: false,
            user: ""
        }
        this.updateLoggedInStatus = this.updateLoggedInStatus.bind(this);
        this.updateToken = this.updateToken.bind(this);
        this.getToken=this.getToken.bind(this);
    }

    async componentDidMount() {
        await this.checkAuthCookie();
    }

    async checkAuthCookie() {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        let response= await fetch(`${applicationUrl}/${route}`, requestOptions);
        if(response.status===200) {
            let text= await response.text();
            let json= await JSON.parse(text);
            this.setState({
                token: json.value.token,
                user: json.value.user,
                userIsLoggedIn:true
            });
        }else{
            this.setState({
                token: "",
                user: "",
                userIsLoggedIn:false
            })
        }
    }


    updateLoggedInStatus(booleanStatus) {
        this.setState({userIsLoggedIn: booleanStatus});
    }

    async updateToken(token) {
        await this.setState({
            token: token
        });
    }

    userIsLoggedIn(){
        if(this.state.userIsLoggedIn){
            return this.state
        }
        return this.state.userIsLoggedIn;
    }

    getToken(){
        return this.state.token;
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
