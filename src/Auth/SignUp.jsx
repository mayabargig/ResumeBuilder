import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import "./LogSign.css";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function SignUp (props){
    const {handelSubmit, changeHandler }= props;

    return (
        <Form id="singUpForm" onSubmit={handelSubmit} name='email'>
            <h2>SingUp Page:</h2><br></br>
            <Row>
                <Col>
                <Form.Control name="firstName" onChange={changeHandler}
                 placeholder="First name" />
                </Col>
                <Col>
                <Form.Control name="lastName" onChange={changeHandler}
                 placeholder="Last name" />
                </Col>
                </Row><br></br>
                <Row>
                <Col>
                <Form.Control name="email" onChange={changeHandler}
                placeholder="Email" />
                </Col>
                <Col>
                <Form.Control name="password" onChange={changeHandler}
                placeholder="Password" />
                </Col>
            </Row><br></br>
            <Button variant="primary" type="submit">
                Submit
            </Button>
    </Form>
    )
}

export default SignUp;