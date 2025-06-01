import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Helmet from 'react-helmet'
import { Container, Col, Row, Card, Badge, Pagination } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Menu from './Include/Menu'

const Genre = () => {
  const { slug } = useParams();
  const [getdata, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const items = getdata?.data?.items;
  const itemsPerPage = 24;
  useEffect(() => {
    const fetchData = async() => {
        try {
            const response = await axios.get(`https://otruyenapi.com/v1/api/the-loai/${slug}?page=${currentPage}`);
            setData(response.data)
            setLoading(false)
            //console.log(response)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    };
    fetchData();
  }, [slug, currentPage]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
     const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalItems = getdata?.data?.params?.pagination?.totalItems || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (<>
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
        <Helmet>
            <title>{getdata.data.seoOnPage.titleHead}</title>
        </Helmet>
        <Container style={{ fontFamily: 'Bangers, monospace' }}>
            <Menu></Menu>
            <h1 style={{
            fontFamily: 'Bangers, cursive',
            fontSize: '3rem',
            textAlign: 'center',
            margin: '20px 0',
            color: 'white'
            }}>
            My Manga Space
            </h1>
            <hr style={{ borderTop: '2px solid white', width: '50%', margin: '0 auto 30px' }} />
            <Row>
                <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>{getdata.data.seoOnPage.titleHead}</Card.Title>
                        {getdata.data.seoOnPage.descriptionHead}
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            <Row>
                {items && items.length > 0 ? (
                    items.map( (item, index) => (
                <Col>
                    <Card as={Link} to={`/manga/${item.slug}`}>
                        <Card.Img variant="top" src={`https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`} />
                        <Card.Body>
                            <Card.Title>{item.name || "No Title"}</Card.Title>
                            <Card.Text>{item.updatedAt}</Card.Text>
                            <Card.Text>
                            {item.category && item.category.length > 0 ? 
                                item.category.map( (category, index) => (
                                    <Badge bg="dark" key={index} style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                                        {category.name}
                                    </Badge>
                                )) : 
                                    "Others"
                                }
                            </Card.Text>
                            {/* <Button variant="success btn-sm" as={Link} to={`/manga/${item.slug}`}>Details</Button> */}
                        </Card.Body>
                    </Card>
                </Col>

                ))
                ) : (
                    <Col>
                        <Card.Body>No Content Available</Card.Body>
                    </Col>
                )}
            </Row>
            <Pagination className='pagination-container'>
                <Pagination.Prev 
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;

                    const rangeStart = Math.floor((currentPage - 1) / 5) * 5 + 1;
                    const rangeEnd = Math.min(rangeStart + 4, totalPages);
                    if (pageNumber >= rangeStart && pageNumber <= rangeEnd) {
                        return (
                            <Pagination.Item
                                key={pageNumber}
                                active={pageNumber === currentPage}
                                onClick={() => paginate(pageNumber)}
                            >
                                {pageNumber}
                            </Pagination.Item>
                        )
                    }
                    return null;
                })}
                <Pagination.Next 
                    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />

            </Pagination>
        </Container>
    </div>
  </>

  )
}

export default Genre