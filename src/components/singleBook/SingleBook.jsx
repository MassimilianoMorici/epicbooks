import React from "react";
import { Card, Button } from "react-bootstrap";



const SingleBook = ({ book, selectedAsin, setSelectedAsin }) => {

    const isSelected = book.asin === selectedAsin;
    const url = `/bookdescription?asin=${book.asin}`;

    const handleClick = () => {
        if (isSelected) {

            setSelectedAsin(null);
        } else {

            setSelectedAsin(book.asin);
        }
    };

    const cardClassName = `mb-4 border-4 modmia ${isSelected ? 'border-danger' : ''}`;


    return (

        <Card className={`${cardClassName} rounded`} style={{ width: '18rem' }} onClick={handleClick}>
            <Card.Img className="custom-card-img" style={{ height: '18rem' }} variant="top" src={book.img} />
            <Card.Body className="d-flex flex-column">
                <div className="d-flex flex-column flex-grow-1">
                    <Card.Title className="card-with-ellipsis">{book.title}</Card.Title>
                    <Card.Text></Card.Text>
                </div>
                <div className="mt-3 d-grid gap-2">
                    <Button href={url} variant="danger" size="lg">Dettagli</Button>
                </div>
            </Card.Body>
        </Card>





    )
}

export default SingleBook;