import {React, useContext, useState}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { HouseGear, BoxArrowRight } from "react-bootstrap-icons"


function NavBar (props){
  const { userName, SingOutClick } = props;

    return(
      <div>
        {
          userName?
          <div>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
          <Navbar.Brand href="#form">PDF Builder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/form">Create Form <HouseGear/> </Link>
            <Link to="/userForm">My Forms </Link>     
            <Link onClick={SingOutClick}>Sing Out <BoxArrowRight/></Link>
          </Nav>
        </Navbar.Collapse>
          </Container>
        </Navbar>
            </div>
          :
          <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
          <Navbar.Brand href="#home">Coins</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link to="/auth">Auth</Link>
          </Nav>
        </Navbar.Collapse>
          </Container>
          </Navbar>
        }
      </div>
    )
}

export default NavBar;