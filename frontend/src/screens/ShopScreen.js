import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Link} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Button,Card} from 'react-bootstrap'
import Rating from '../components/Rating'
import  magasins from '../magasins'
import Produit from '../components/Produit'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMagasinDetails } from '../actions/mag'
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
function ShopScreen({match,history}) {

  const dispatch = useDispatch()

  const magasinDetails = useSelector(state => state.magasinDetails)
  const { loading, error, magasin } = magasinDetails
  useEffect(() => {


    dispatch(listMagasinDetails(match.params.id))

}, [dispatch, match])
    return (
        <div>
          <Link to='/' >  <Button className='btn btn-dark my-3' size="md" block>
    Retour a la page principale
  </Button></Link>
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
      <Card.Title><strong>Catégorie : </strong>{magasin.categorie}</Card.Title>
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

</div>)}
        </div>
    )
}

export default ShopScreen
