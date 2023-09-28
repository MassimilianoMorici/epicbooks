import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { SearchText } from '../../contexts/SearchText';

function MyNav() {

    const { searchText, setSearchText } = useContext(SearchText);
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">EPIBOOKS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/about">Browse</Nav.Link>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Cerca per titolo..."
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                                        />
                                        <button className="btn btn-outline-secondary" type="button">
                                            Cerca
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNav;