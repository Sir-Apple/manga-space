import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Helmet from 'react-helmet'
import { Container, Col, Row, Card, Button, Badge, ListGroup, Modal } from 'react-bootstrap'
import Menu from './Include/Menu'


const DetailsPage = () => {
  const { slug } = useParams();
  const [getdata, setData] = useState([]);
  const [getDataChapter, setDataChapter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const item = getdata?.data?.data?.item;
  useEffect(() => {
    const fetchData = async() => {
        try {
            const response = await axios.get(`https://otruyenapi.com/v1/api/truyen-tranh/${slug}`);
            setData(response);
            setLoading(false);
            console.log(response);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    fetchData();
  }, [slug]);
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  const handleClose = () => setIsModalOpen(false)
  const handleReadChapter = async(chapter_api) => {
    try {
            const response = await axios.get(`${chapter_api}`);
            setDataChapter(response.data);
            setLoading(false);
            console.log(response);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    setIsModalOpen(true)
  };
  return (
    <>
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      <Helmet>
        <title>{getdata.data.data.seoOnPage.titleHead}</title>
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
        {/* <Button as={Link} to="/home" >Back to Homepage</Button> */}
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
          <Col>
              <Card style={{width: "30rem"}}>
                  <Card.Img 
                  variant="top" 
                  src={`https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`} />
                  <Card.Body>
                      <Card.Title>{item.name || "No Title"}</Card.Title>
                      <Card.Title dangerouslySetInnerHTML={{__html: item.content}}></Card.Title>
                      <Card.Text>{item.updatedAt}</Card.Text>
                      <Card.Text>{item.status}</Card.Text>
                      <Card.Text>
                      {item.author && item.author.length > 0 ? (
                          item.author.map( (author, index) => (
                              <Badge bg="dark" key={index}>
                                  {author.name}
                              </Badge>
                          ))) : (
                              "Others"
                          )}
                      </Card.Text>
                      <Card.Text>
                      {item.category && item.category.length > 0 ? (
                          item.category.map( (category, index) => (
                              <Badge bg="dark" key={index} style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                                  {category.name}
                              </Badge>
                          ))) : (
                              "Others"
                          )}
                      </Card.Text>
                  </Card.Body>
              </Card>
          </Col>
          <Col>
            <Card style={{width : "30rem"}}>
                <ListGroup className="scrollable-list">
                  {item.chapters && item.chapters.length > 0 ? (
                                item.chapters.map( (chapter, index) => (
                                  <div key={index}>
                                    <h5>{chapter.server_name}</h5>
                                    <ListGroup.Item>
                                      {chapter.server_data && chapter.server_data.length > 0 ? (
                                        chapter.server_data.map((listchapter, subIndex) => (
                                          <div className="chapter_click" key={subIndex} onClick={()=> handleReadChapter(listchapter.chapter_api_data)}>
                                            Chapter : {listchapter.chapter_name}
                                          </div>                                         
                                        ))
                                       ) : (
                                        <span>New chapters are coming soon...</span>
                                      )}
                                    </ListGroup.Item>
                                  </div>
                                )) 
                              ) : (
                                <span>New chapters are coming soon...</span>
                                )}
                </ListGroup>
              </Card>
          </Col>
        </Row>
        {isModalOpen && (
            <Modal show={isModalOpen} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Chapter {getDataChapter.data.item.chapter_name} - {getDataChapter.data.item.comic_name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {getDataChapter.data.item.chapter_image && 
                  getDataChapter.data.item.chapter_image.length > 0 ? 
                    getDataChapter.data.item.chapter_image.map((chapterImage, index) => 
                      <Card.Img style={{margin: 0}} variant="top" 
                        src={`${getDataChapter.data.domain_cdn}/${getDataChapter.data.item.chapter_path}/${chapterImage.image_file}`}>
                        
                      </Card.Img>
                  )
                  : "No images available for this chapter."}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
      </Container>
      </div>
    </>
  )
}

export default DetailsPage