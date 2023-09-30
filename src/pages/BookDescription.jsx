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
import { Trash3, Pen, CheckCircleFill } from 'react-bootstrap-icons';
import { Modal } from 'react-bootstrap'
import AlertMessage from '../components/alertMessage/AlertMessage'
import { useTheme } from '../contexts/ThemeContext'


function BookDescription() {


    const [queryParameters] = useSearchParams();
    const bookPage = books.filter(book => book.asin === queryParameters.get("asin"))
    const url_api = `https://striveschool-api.herokuapp.com/api/comments/`
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTE0M2RhYzJjMjllYzAwMTk4NzJmM2UiLCJpYXQiOjE2OTU4MjUzMjQsImV4cCI6MTY5NzAzNDkyNH0.WIKziaLUpdjhnPoM44S-6y-doqRbu5ytZZiYBhDhPsU"
    const myEmail = 'morici.massimiliano.lavoro@gmail.com'


    const [successMessage, setSuccessMessage] = useState(null);


    const { data, getData, isloading, error } = useFetchData(url_api + queryParameters.get("asin"), token);
    const [newComment, setNewComment] = useState({
        comment: '',
        rate: '',
        elementId: bookPage[0].asin,
    });

    const [showEditModal, setShowEditModal] = useState(false);
    const [editComment, setEditComment] = useState({
        _id: "",
        rate: "",
        comment: "",
        elementId: bookPage[0].asin,
    });

    const openEditModal = (commentData) => {
        setEditComment({
            _id: commentData._id,
            rate: commentData.rate,
            comment: commentData.comment,
            elementId: commentData.elementId,
        });
        setShowEditModal(true);
    };


    const handleEditComment = async (e) => {
        e.preventDefault();
        try {
            await fetch(url_api + editComment._id, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editComment),
            });

            setShowEditModal(false);
            setSuccessMessage("Commento modificato con successo!");
            getData()

            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);

        } catch (e) {
            console.error("Errore durante la modifica del commento", e);
        }
    };


    const handleModComment = (e) => {
        const { name, value } = e.target;
        setEditComment({
            ...editComment,
            [name]: value
        })
    }

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

            setSuccessMessage("Commento creato con successo!");

            getData()

            setNewComment({
                comment: "",
                rate: "",
                elementId: bookPage[0].asin,
            });

            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);

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
            setSuccessMessage("Commento eliminato con successo!");

            getData()

            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);

        } catch (e) {
            console.log("Errore durante l'eleminazione del commento: ", e);
        }
    }

    const { theme } = useTheme()

    return (

        <div className={theme === 'light' ? '' : 'bg_costum'}
            style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
            <MyNav />


            {/* SCHERMO GRANDE */}
            <div className="container d-none d-md-flex d-xxl-flex">
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
                                    <Button className='my-3' type="submit">Invia commento</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* SCHERMO PICCOLO */}
            <div className="container d-block d-md-none">
                <div className="row">
                    <div className="col">
                        <div className='container d-flex justify-content-center mt-5'>
                            <img src={bookPage[0].img} className='imgPage' alt='imageBook' />
                        </div>
                        <div className="d-flex flex-nowrap justify-content-evenly my-5">

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
                                    <Button className='my-3' type="submit">Invia commento</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <hr></hr>

            {successMessage && (
                <AlertMessage message={successMessage} >
                    <div className='color_mod'> <CheckCircleFill className='me-2' size={30} />{successMessage}</div>
                </AlertMessage>
            )}

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
                        <div className='d-flex flex-wrap justify-content-between mb-3'>
                            <h3 className='text-ellipsis'>{data.author}</h3>

                            {/* SE SEI L'AUTORE DEL COMMENTO ALLORA PUOI MODIFICARLO O ELIMINARLO */}
                            {data.author === myEmail && (
                                <>
                                    <div className=''>
                                        <Pen onClick={() => openEditModal(data)} color="red" size={25} role="button" />
                                        <Trash3 onClick={() => deleteComment(url_api + data._id)} color="red" size={25} role="button" className='mx-3' />
                                    </div>
                                </>
                            )}

                        </div>
                        <h6>Voto: {data.rate}</h6>
                        <h5>{data.comment}</h5>
                    </div>
                ))}
            </div>


            {/* MODAL PER MODIFICARE IL COMMENTO */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica Commento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditComment}>
                        <Form.Group controlId="editRate">
                            <Form.Label className='ms-2'>Voto:</Form.Label>
                            <Form.Control
                                type="number"
                                name="rate"
                                value={editComment.rate}
                                onChange={handleModComment}
                                min="1"
                                max="5"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="editComment">
                            <Form.Label className='mt-3 ms-2'>Commento:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="comment"
                                value={editComment.comment}
                                onChange={handleModComment}
                                required
                            />
                        </Form.Group>
                        <Button className='mt-3' type="submit">Salva Modifiche</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <MyFooter />
        </div>
    )
}

export default BookDescription