import React from "react";
import { Card, Button } from "react-bootstrap";




const SingleBook = ({ book }) => {



    return (
        <Card className="mb-4" style={{ width: '18rem' }}>
            <Card.Img className="custom-card-img" style={{ height: '18rem' }} variant="top" src={book.img} />
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                    <p>{book.category}</p>
                    <p>Prezzo: {book.price}</p>
                </Card.Text>
                <Card.Text className="d-flex flex-wrap justify-content-evenly">
                    <Button variant="primary">Go somewhere</Button>
                    <span>{book.asin}</span>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SingleBook;