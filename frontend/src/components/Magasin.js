import React from 'react'
import { Card} from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'
//we destractured the magasin prop we could do props.magasin but like this we only do it once
function Magasin({magasin,keyword}) {
    return (
        <Card className="my-3    rounded    "  >
            <Link to={`/magasin/${keyword}/${magasin._id}`}>
            <Card.Img style={{ height: '13rem' }} variant="top" src={process.env.REACT_APP_API_URL+'/static'+magasin.image}/></Link>
         <Card.Body>
         <Link to={`/magasin/${keyword}/${magasin._id}`}>
            <Card.Title  as="div">
             <strong>{magasin.nom}</strong>  <p> <strong> {magasin.categorie}</strong></p>
                </Card.Title>
            </Link>
         
            <Card.Text as="div">
                <div className="my-3">

             <Rating value={magasin.rating} text={`${magasin.numReviews} avis`} color={'#f8e825'}></Rating>
                </div>
            </Card.Text>
            <Card.Text as="div">
                <strong>
            <i class="fas fa-map-marker-alt"></i> <p><strong>{magasin.commune&&magasin.commune.wilaya} {magasin.commune&&magasin.commune.nom} {magasin.adresse}</strong></p>
            </strong>
            </Card.Text>
         </Card.Body>
        </Card>
    )
}

export default Magasin
