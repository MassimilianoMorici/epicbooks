import React from 'react'
import MyNav from '../components/navbar/MyNav'
import MyFooter from '../components/footer/MyFooter'

function NotFound() {
    return (
        <>
            <MyNav />
            <div className='text-center bg-light p-5'>
                <h1 className='mb-5'>404</h1>
                <h3 className='mb-5'>Pagina non trovata</h3>
            </div>
            <MyFooter />
        </>
    )
}

export default NotFound