import React from 'react'
import { Card} from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'
//we destractured the magasin prop we could do props.magasin but like this we only do it once
function Magasin({magasin}) {
    return (
        <Card className="my-3    rounded" >
            <Link to={`/magasin/${magasin._id}`}>
            <Card.Img variant="top" src={magasin.image}/></Link>
         <Card.Body>
         <Link to={`/magasin/${magasin._id}`}>
            <Card.Title  as="div">
             <strong>{magasin.Nom}</strong>  <p> <strong> {magasin.catégorie}</strong></p>
                </Card.Title>
            </Link>
         
            <Card.Text as="div">
                <div className="my-3">

             <Rating value={magasin.Note} text={`${magasin.numReviews} avis`} color={'#f8e825'}></Rating>
                </div>
            </Card.Text>
            <Card.Text as="div">
                <strong>
            <i class="fas fa-map-marker-alt"></i> <p><strong>{magasin.Wilaya} {magasin.Commune} {magasin.Adresse}</strong></p>
            </strong>
            </Card.Text>
         </Card.Body>
        </Card>
    )
}

export default Magasin
