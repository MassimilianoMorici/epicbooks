import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTheme } from '../../contexts/ThemeContext';
import { useContext } from 'react';
import { SearchText } from '../../contexts/SearchText';
import { SunFill, MoonFill } from 'react-bootstrap-icons';
import { Nav } from 'react-bootstrap';
import logo from '../../assets/epibooks.png';


function MyNav() {

    const { theme, toggleTheme } = useTheme();

    const handleThemeToggle = () => {
        toggleTheme();
    };

    const { searchText, setSearchText } = useContext(SearchText);

    return (

        <Navbar expand="lg"
            className={theme === 'light' ? 'bg-light' : 'bg-dark'}
            style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}
        > <Container>

                <a href="/"><img className='logo' src={logo} alt="logo" /></a>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-danger" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className=" d-flex align-items-center me-auto">
                        <div className='d-flex'>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link className='ms-3' href="/about">About</Nav.Link>
                            <Nav.Link className='ms-3' href="/about">Browse</Nav.Link>
                        </div>
                    </div>

                    <Form className="d-flex mt-1">
                        <Form.Control
                            type="text"
                            className="form-control me-2"
                            placeholder="Cerca per titolo..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                        />
                    </Form>

                    <div className='mt-1'>
                        {theme === 'light' &&
                            <Button variant='primary' onClick={handleThemeToggle}> <SunFill size={30} /> </Button>}
                        {theme === 'dark' &&
                            <Button variant='primary' onClick={handleThemeToggle}> <MoonFill size={25} /> </Button>}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar >

    );
}

export default MyNav;


