import React, { useState, useEffect } from 'react'
import MyNav from '../components/navbar/MyNav'
import MyFooter from '../components/footer/MyFooter'
import { useSearchParams } from 'react-router-dom'
import { books } from '../data/books'


function BookDescription() {


    const [queryParameters] = useSearchParams();
    const bookPage = books.filter(book => book.asin === queryParameters.get("asin"))
    const url_api = `https://striveschool-api.herokuapp.com/api/comments/${queryParameters.get("asin")}`
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTE0M2RhYzJjMjllYzAwMTk4NzJmM2UiLCJpYXQiOjE2OTU4MjUzMjQsImV4cCI6MTY5NzAzNDkyNH0.WIKziaLUpdjhnPoM44S-6y-doqRbu5ytZZiYBhDhPsU"


    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const getData = async () => {

        try {
            const response = await fetch(`${url_api}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            console.log(data);
            setData(data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <MyNav />
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-nowrap justify-content-evenly my-5">
                            <img src={bookPage[0].img} style={{ width: "18rem" }} alt='imageBook' />
                            <div className='mx-5'>
                                <h1>{bookPage[0].title}</h1>
                                <h4 className='mt-4'>{bookPage[0].category}</h4>
                                <h6 className='mt-5'>ASIN: {bookPage[0].asin}</h6>
                                <h2 className='mt-5'>Prezzo: {bookPage[0].price}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container'>
                <h3>Commenti:</h3>

                {data.map((data, index) => (
                    <div key={index} className='my-5'>
                        <h2>{data.author}</h2>
                        <p>Voto: {data.rate}</p>
                        <p>{data.comment}</p>
                    </div>
                ))}
            </div>
            <MyFooter />
        </>

    )
}

export default BookDescription