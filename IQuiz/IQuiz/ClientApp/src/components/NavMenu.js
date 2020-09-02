import React, {Component} from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);
        window.navMenuFunctions = this;
        this.state = {
            collapsed: true,
            userIsLoggedIn: false,
            currentUserName: 'Login/Register'
        }
        this.updateCurrentUser = this.updateCurrentUser.bind(this);
        this.updateUserIsLoggedInStatus = this.updateUserIsLoggedInStatus.bind(this);
        this.attemptLogOut = this.attemptLogOut.bind(this);
        this.handleLogout=this.handleLogout.bind(this);
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    updateCurrentUser(email) {
        this.setState({currentUserName: email});
    }

    updateUserIsLoggedInStatus(booleanStatus) {
        this.setState({userIsLoggedIn: booleanStatus});
    }

    attemptLogOut() {
        this.setState({
            userIsLoggedIn: false,
            currentUserName: 'Login/Register'
        });
        window.appFunctions.updateToken("");
    }

    handleLogout() {
        this.attemptLogOut();
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">IQuiz</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed}
                                  navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        className="text-dark"
                                        to="/quiz">Quiz!</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        className="text-dark"
                                        to="/top">Top Scores</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        hidden={this.state.userIsLoggedIn}
                                        tag={Link}
                                        className="text-dark"
                                        to="/login">{this.state.currentUserName}</NavLink>
                                    <NavLink
                                        hidden={!this.state.userIsLoggedIn}
                                        tag={Link}
                                        className="text-dark"
                                        to="/">{`Welcome ${this.state.currentUserName}`}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        hidden={!this.state.userIsLoggedIn}
                                        tag={Link}
                                        className="text-dark"
                                        onClick={this.handleLogout}
                                        to="/">Log Out</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }


}
