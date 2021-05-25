import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Link,Redirect} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Button,Card,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import  magasins from '../magasins'
import ProduitMarchant from '../components/ProduitMarchant'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMagasinDetails,deleteMagasin } from '../actions/mag'
import { connect } from 'react-redux';
import axios from 'axios'

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
function ShopMarchantScreen({match,history,user,isAuthenticated}) {

  
  const dispatch = useDispatch()

  const magasinDetails = useSelector(state => state.magasinDetails)
  const { loading, error, magasin } = magasinDetails


const [uploading,setUploading]=useState(false)
const delete_Magasin=async(e)=>{
  if (window.confirm('etes vous sure de vouloir supprimer ce magasin?')) {
  e.preventDefault();
  try {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`
        }
    }

    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/magasins/delete/${match.params.id}`, config)



    setUploading(false)
    if(user){
      if(user.is_merchant){
        
        window.location.replace(`/marchant/magasinslist`)}
      else{
        
       
        window.location.replace(`/`)}
    }

    

} catch (error) {
    setUploading(false)
    console.log(error)

   
  
}


}
else{
setUploading(false)
}
}
//useeffect glob
useEffect(() => {
   
  dispatch(listMagasinDetails(match.params.id))
  

}, [dispatch,magasin,match])
  
  

  
 
  


if (isAuthenticated==false) {
  
  history.replace('/')
  
}
else{
  if(user&&magasin.user){
    if(user&&magasin.user!==user.id) history.replace('/')
  }
}



    return (
      
        <div >
          <Link to='/marchant/magasinslist' >  <Button className='btn btn-dark my-3' size="md" block>
    Retour a la liste principale
  </Button></Link>
  <Link to={`/update-magasin/${match.params.id}`} >  <Button className='btn btn-dark my-3' size="md" block>
    Modifier le magasin
  </Button></Link>

  <Button className='btn btn-dark my-3' size="md" onClick={e=>delete_Magasin(e)} block>
   <i class="fas fa-trash-alt"></i>
  </Button>
 
  {loading||uploading?
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
        <Link to={`/ajouter-produit/${match.params.id}`} >  <Button className='btn btn-dark my-3' size="md" block>
    ajouter un produit dans le magasin
  </Button></Link>
        {(() => {
              if (magasin.produits){
        return(
            <Carousel responsive={responsive}>
            {
            magasin.produits.map(produit=>(
                    <Col   key={produit._id} md={11}  >
                    <ProduitMarchant produit={produit}/>
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
const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated,
  user:state.auth.user
});
export default connect(mapStateToProps)(ShopMarchantScreen)
