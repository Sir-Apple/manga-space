import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Helmet from 'react-helmet'
import { Container, Col, Row, Card, Badge } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Menu from './Include/Menu'

const Trending = () => {
    const { slug } = useParams();
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const items = getdata?.data?.data?.items;
  useEffect(() => {
    const fetchData = async() => {
        try {
            const response = await axios.get(`https://otruyenapi.com/v1/api/danh-sach/${slug}`);
            setData(response)
            setLoading(false)
            //console.log(response)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    };
    fetchData();
  }, [slug]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
  return (<>
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
        <Helmet>
            <title>{getdata.data.data.seoOnPage.titleHead}</title>
        </Helmet>
        <Container style={{ fontFamily: 'Bangers, monospace' }}>
            <Menu></Menu>
            <Row>
                <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>{getdata.data.data.seoOnPage.titleHead}</Card.Title>
                        {getdata.data.data.seoOnPage.descriptionHead}
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
        </Container>
    </div>
  </>

  )
}

export default Trending