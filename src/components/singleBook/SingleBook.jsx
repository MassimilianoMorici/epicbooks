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

    const cardClassName = `mb-4 border-4 ${isSelected ? 'border-danger' : ''}`;


    return (
        <Card className={cardClassName} style={{ width: '18rem' }} onClick={handleClick} >
            <Card.Img className="custom-card-img" style={{ height: '18rem' }} variant="top" src={book.img} />
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                    Categoria: {book.category}<br />
                    Prezzo: {book.price}
                </Card.Text>
                <Card.Text className="d-flex flex-wrap justify-content-evenly">
                    <Button href={url} variant="primary">Dettagli</Button>
                    <span>{book.asin}</span>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SingleBook;