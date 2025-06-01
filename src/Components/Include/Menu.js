import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Menu = () => {
  const navigate = useNavigate();
  const [getdata, setData] = useState([]);
  const items = getdata?.data?.items;
  useEffect(() => {
    const fetchData = async() => {
        try {
            const response = await axios.get("https://otruyenapi.com/v1/api/the-loai")
            setData(response.data)
        } catch (error) {

        }
    };
    fetchData();
  }, []);
  const handleSearch = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('keyword')
    navigate(`/search?query=${query}`)
    }
  return (
    <div>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand as={Link} to="/home">My manga space</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                {/* <Nav.Link as={Link} to="/home">Home</Nav.Link> */}
                <Nav.Link as={Link} to="/trending/dang-phat-hanh">Publishing</Nav.Link>
                <Nav.Link as={Link} to="/trending/hoan-thanh">Completed</Nav.Link>
                <Nav.Link as={Link} to="/trending/sap-ra-mat">Coming soon</Nav.Link>
                <NavDropdown title="Genre" id="basic-nav-dropdown">
                    {items && items.length > 0 ? (
                            items.map( (item, index) => (
                    <NavDropdown.Item as={Link} to={`/genre/${item.slug}`}>
                        {item.name}
                    </NavDropdown.Item>))) : (
                    <NavDropdown.Item as={Link} to="/home">
                        Latest release
                    </NavDropdown.Item>
                    )}
                </NavDropdown>
                <Form inline autoComplete='off' method='get' onSubmit={handleSearch}>
                    <Row>
                    <Col xs="auto">
                        <Form.Control
                        type="text"
                        name="keyword"
                        placeholder="Search"
                        className=" mr-sm-2"
                        />
                    </Col>
                    <Col xs="auto">
                        <Button type="submit">Search</Button>
                    </Col>
                    </Row>
                </Form>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </div>
  )
}

export default Menu