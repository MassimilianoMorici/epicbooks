import React, { useState } from 'react'
import MyNav from '../components/navbar/MyNav'
import MyFooter from '../components/footer/MyFooter'
import { useSearchParams } from 'react-router-dom'
import { books } from '../data/books'
import useFetchData from '../hook/useFetchData'
import { MoonLoader } from 'react-spinners'


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { Trash3 } from 'react-bootstrap-icons';



function BookDescription() {


    const [queryParameters] = useSearchParams();
    const bookPage = books.filter(book => book.asin === queryParameters.get("asin"))
    const url_api = `https://striveschool-api.herokuapp.com/api/comments/`
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTE0M2RhYzJjMjllYzAwMTk4NzJmM2UiLCJpYXQiOjE2OTU4MjUzMjQsImV4cCI6MTY5NzAzNDkyNH0.WIKziaLUpdjhnPoM44S-6y-doqRbu5ytZZiYBhDhPsU"



    const { data, isloading, error } = useFetchData(url_api + queryParameters.get("asin"), token);
    const [newComment, setNewComment] = useState({

        comment: '',
        rate: '',
        elementId: bookPage[0].asin,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComment({
            ...newComment,
            [name]: value,
        });
    };



    const postComment = async (e) => {
        e.preventDefault();


        try {
            await fetch(url_api, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newComment)
            });
            window.location.reload();

        } catch (e) {
            console.error("Errore durante l'invio del commento", e);
        }

    };


    const deleteComment = async (url) => {
        try {
            await fetch(url, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            window.location.reload();
        } catch (e) {
            console.log("Errore durante l'eleminazione del commento: ", e);
        }
    }


    return (
        <>
            <MyNav />
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-nowrap justify-content-evenly my-5">
                            <img src={bookPage[0].img} className='imgPage' alt='imageBook' />
                            <div className='mx-5'>
                                <h1>{bookPage[0].title}</h1>
                                <h4 className='mt-3'>Categoria: {bookPage[0].category}</h4>
                                <h6 className='mt-2'>ASIN: {bookPage[0].asin}</h6>
                                <h6 className='mt-2'>Prezzo: {bookPage[0].price}€</h6>
                                <hr className='mt-3'></hr>
                                <h4 className='mt-2'>Inserisci un commento:</h4>

                                <Form onSubmit={postComment}>
                                    <Row className="flex-column">
                                        <Form.Group md="4" controlId="rate" style={{ width: "130px" }}>
                                            <Form.Label><span className='fw-bold'>Voto:</span></Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="rate"
                                                placeholder="da 1 a 5"
                                                value={newComment.rate}
                                                onChange={handleInputChange}
                                                min="1"
                                                max="5"
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group md="8" controlId="comment" className='mt-2'>
                                            <Form.Label><span className='fw-bold'>Commento:</span></Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                name="comment"
                                                placeholder="Inserisci un commento..."
                                                value={newComment.comment}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Button className='my-4' type="submit">Invia commento</Button>
                                </Form>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='container d-flex justify-content-center my-5'>
                <h3>Aggiungi Commento: </h3>
                <form onSubmit={postComment}>
                    <input
                        type="text"
                        name="rate"
                        max="5"
                        placeholder="Voto"
                        value={newComment.rate}
                        onChange={handleInputChange}
                    />
                    <p>{rateError}</p>
                    <textarea
                        name="comment"
                        placeholder="Commento"
                        value={newComment.comment}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Invia commento</button>
                </form>
            </div> */}

            {/* <Form onSubmit={postComment}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            defaultValue="Mark"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                            defaultValue="Otto"
                        />
                    </Form.Group>
                </Row>

                <Button type="submit">Submit form</Button>
            </Form> */}


            {/* <Form onSubmit={postComment} className='container' style={{ maxWidth: " 50vh" }}>
                <Row className="mb-3flex-column">
                    <Form.Group md="4" controlId="rate" style={{ width: "15vh" }}>
                        <Form.Label>Voto:</Form.Label>
                        <Form.Control
                            type="number"
                            name="rate"
                            placeholder="Voto"
                            value={newComment.rate}
                            onChange={handleInputChange}
                            min="1"
                            max="5"
                            required
                        />
                        <p>{rateError}</p>
                    </Form.Group>
                    <Form.Group md="8" controlId="comment">
                        <Form.Label>Commento:</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="comment"
                            placeholder="Inserisci un commento..."
                            value={newComment.comment}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Row>
                <Button className='my-4' type="submit">Invia commento</Button>
            </Form> */}










            <hr></hr>
            <div className='container'>
                <h3 className='ms-1 mt-5'>Commenti:</h3>

                {error && <h2>Errore durante il caricamento</h2>}
                {isloading && (
                    <div className='container d-flex justify-content-center my-5'>
                        <MoonLoader />
                    </div>
                )}

                {data.map((data, index) => (
                    <div key={index} className='my-5 comments'>
                        <h3>{data.author}</h3>
                        <h6>Voto: {data.rate}</h6>
                        <h5>{data.comment}</h5>
                        <Trash3 onClick={() => deleteComment(url_api + data._id)} color="red" size={25} role="button" />
                        {/* <button onClick={() => deleteComment(url_api + data._id)}><Trash3 className="ml-4" /></button> */}
                    </div>
                ))}
            </div>
            <MyFooter />
        </>
    )
}

export default BookDescription