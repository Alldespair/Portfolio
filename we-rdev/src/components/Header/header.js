import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Logo from './Logo.svg';
import './header.sass';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from '../../Pages/Home';
import About from '../../Pages/About';

export default class Header extends React.Component {
  render() {
    return(
      <>
        <Navbar className="header" collapseOnSelect expand="lg" bg="white">
          <Container fluid>
            <Navbar.Brand href="/">
              <img
                src={Logo}
                height="82px"
                alt="Logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <Nav.Link href="/"> Home </Nav.Link>
                <Nav.Link href="about"> About us </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
          </Switch>
        </Router>
      </>
    )
  };
}