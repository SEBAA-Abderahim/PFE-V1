import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Link} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Button,Card} from 'react-bootstrap'
import Rating from '../components/Rating'
import  magasins from '../magasins'
import Produit from '../components/Produit'
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
function ShopScreen({match}) {
  const magasin=magasins.find((m)=>m._id===match.params.id)
    return (
        <div>
          <Link to='/' >  <Button className='btn btn-dark my-3' size="md" block>
    Retour a la page principale
  </Button></Link>
        <Row >
          <Col md={7}>
            <Image src={magasin.image} alt={magasin.Nom} fluid/>
          </Col>
          
        
         <Col md={5}>
    
  <Card border="light" style={{ width: '100%' }}>
    <Card.Header><h3>{magasin.Nom}</h3></Card.Header>
    <Card.Body>
      <Card.Title><strong>Catégorie : </strong>{magasin.catégorie}</Card.Title>
      <ListGroup variant="flush">
    <ListGroup.Item  className="pl-0">
    <Rating value={magasin.Note} text={`${magasin.numReviews} avis`} color={'#f8e825'}></Rating>
    </ListGroup.Item>
    <ListGroup.Item className="pl-0">
    <span style={{color:'black'}}><strong>Wilaya:</strong></span>   {magasin.Wilaya}
      <br/>
      <span style={{color:'black'}}><strong>Comune:</strong></span> {magasin.Commune}
      <br/>
      <i class="fas fa-map-marker-alt"> </i> <span style={{color:'black'}}><strong>{magasin.Adresse}</strong></span>
      </ListGroup.Item>
    <ListGroup.Item className="pl-0">

    <span style={{color:'black'}}><i class="fas fa-phone-alt"></i>{magasin.Telephone}</span>

    </ListGroup.Item>
    <ListGroup.Item className="pl-0">

<span style={{color:'black'}}><i class="fas fa-door-open"></i>{magasin.Ouverture}</span>
<br/>
<span style={{color:'black'}}><i class="fas fa-door-closed"></i>{magasin.Fermeture}</span>
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
            <MapContainer   className="my-3" center={[magasin.Latitude, magasin.Longitude]} zoom={10} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[magasin.Latitude, magasin.Longitude]}>
    <Popup>
      {magasin.Nom}
    </Popup>
  </Marker>
</MapContainer>
        </div>
    )
}

export default ShopScreen
