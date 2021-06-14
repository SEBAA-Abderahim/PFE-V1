import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Link} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Button,Card,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import  magasins from '../magasins'
import Produit from '../components/Produit'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMagasinDetails,createMagasinReview,delete_msgMag,delete_errMag, createMagasinVisite,createMagasinRequete } from '../actions/mag'
import { connect } from 'react-redux';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  //ici match nous donne acces au parametre de l url
function ShopScreen({match,history,user, delete_msgMag,delete_errMag,isAuthenticated}) {
  
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const magasinDetails = useSelector(state => state.magasinDetails)
  const { loading, error, magasin } = magasinDetails


  const [ numItems, setnumItems] = useState(2);
  const handleClick=()=> {
    setnumItems(numItems+1);
  }

  const submitHandler = (e) => {
    e.preventDefault()
  
    dispatch(createMagasinReview(
        match.params.id, {
        rating,
        comment
    }
    ))
}

  const magasinReviewCreate = useSelector(state => state.magasinReviewCreate)
  const {
      loading: loadingMagasinReview,
      error: errorMagasinReview,
      success: successMagasinReview,
  } = magasinReviewCreate
 
  //useeffect glob
  useEffect(() => {
    
    history.listen((location) => {
      delete_msgMag()
      delete_errMag()
     
        
  })
    dispatch(listMagasinDetails(match.params.id))


}, [dispatch, match,magasin])




useEffect(() => {


      // do something
    
    if(match.params.keyword !== undefined && match.params.keyword !== "undefined"){
      let keyword={keyword:match.params.keyword}
      dispatch(createMagasinRequete(match.params.id,
        keyword
      ))
     
    }
     

}, []);


    return (
      
        <div >
          <Link to='/' >  <Button className='btn btn-dark my-3' size="md" block>
    Retour a la page principale
  </Button></Link>


  <Button className='btn btn-dark my-3' size="md" onClick={history.goBack} >
    Retour a la page precedente
  </Button>
  {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    :(<div>
        <Row >
          <Col md={7}>
            <Image src={process.env.REACT_APP_API_URL+'/static'+magasin.image} alt={magasin.nom} fluid/>
          </Col>
          
        
         <Col md={5}>
    
  <Card border="light" style={{ width: '100%' }}>
    <Card.Header><h3>{magasin.nom}</h3></Card.Header>
    <Card.Body>
      <Card.Title><strong>Catégorie : </strong>{magasin.categorie&&magasin.categorie.nom}</Card.Title>
      <ListGroup variant="flush">
    <ListGroup.Item  className="pl-0">
    <Rating value={magasin.rating} text={`${magasin.numReviews} avis`} color={'#f8e825'}></Rating>
    </ListGroup.Item>

    <ListGroup.Item className="pl-0">
    <span style={{color:'black'}}><strong>Wilaya:</strong>{magasin.commune&&magasin.commune.wilaya}</span>   
      <br/>
      <span style={{color:'black'}}><strong>Comune:</strong> {magasin.commune&&magasin.commune.nom}</span>
      <br/>
      <i class="fas fa-map-marker-alt"> </i> <span style={{color:'black'}}><strong>{magasin.adresse}</strong></span>
      </ListGroup.Item>
 
    <ListGroup.Item className="pl-0">

    <span style={{color:'black'}}><i class="fas fa-phone-alt"></i>{magasin.telephone}</span>

    </ListGroup.Item>
    <ListGroup.Item className="pl-0">

<span style={{color:'black'}}><i class="fas fa-door-open"></i>{magasin.overture}</span>
<br/>
<span style={{color:'black'}}><i class="fas fa-door-closed"></i>{magasin.fermeture}</span>
</ListGroup.Item>
  </ListGroup>
    </Card.Body>
  </Card>
  </Col>
  
        </Row>
        {(() => {
              if (magasin.produits){
        return(
            <Carousel responsive={responsive}>
            {
            magasin.produits.map(produit=>(
                    <Col   key={produit._id} md={11}  >
                    <Produit produit={produit}/>
                    </Col>
                ))

                }
</Carousel>
        )}    return null;
      })()}
  
            <MapContainer   className="my-3" center={[magasin.latitude?magasin.latitude:0, magasin.longitude?magasin.longitude:0]} zoom={10} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[magasin.latitude?magasin.latitude:0, magasin.longitude?magasin.longitude:0]}>
    <Popup>
      {magasin.nom}
    </Popup>
  </Marker>
</MapContainer>
<Row>
<Button className='btn btn-dark my-3' size="md" block>
   Avis
  </Button>
  <Col md={12}>
  {magasin.reviews.length === 0 && <Message variant='info' >Pas d'avis!</Message>}
  </Col>
                                <Col md={6}>
                                
                                  

                                    <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                            <h4>Réidiger ou modifier votre avis</h4>

                                            {loadingMagasinReview && <Loader />}
                                            {successMagasinReview && <Message variant='success'>Avis rédigé</Message>}
                                           
                                   
 
      {errorMagasinReview && <Message variant='danger'>{errorMagasinReview}</Message>}
                
                                            {user!=null ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Note</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        required
                                                        >
                                                            <option value=''>Selectionez...</option>
                                                            <option value='1'>1 - Pauvre</option>
                                                            <option value='2'>2 - Assez bien</option>
                                                            <option value='3'>3 - Bien</option>
                                                            <option value='4'>4 - Très Bien</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Avis</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        disabled={loadingMagasinReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Submit
                                                    </Button>

                                                </Form>
                                            ) : (
                                                    <Message variant='primary'>Veillez <Link to='/login'>Vous connectez</Link> pour rédiger votre avis</Message>
                                                )}
                                        </ListGroup.Item>
                                        {magasin.reviews.slice(0, numItems).map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color='#f8e825' />
                                                <p>{review.date_created.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}
                                        </ListGroup>
                                        {numItems<magasin.reviews.length?
                                         <Button className='btn btn-dark my-3' size="md" onClick={e=>handleClick(e)}> Voir plus d'avis
                                         </Button>
                                        :""}
                  
                                        </Col>
                                        
                                        </Row>
</div>)}
        </div>
    )
}
const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated,
  user:state.auth.user
});
export default connect(mapStateToProps,{delete_msgMag,delete_errMag})(ShopScreen)
