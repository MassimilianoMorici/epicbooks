import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';





const MyFooter = () => {
    return (
        <footer className="bg-dark text-light py-3">
            <Container>
                <Row>
                    <Col sm={4}>                             <p>Riga 1 del Footer</p>
                    </Col>
                    <Col sm={4}>
                        <p>Riga 2 del Footer</p>
                    </Col>
                    <Col sm={4}>
                        <p>Riga 3 del Footer</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default MyFooter;