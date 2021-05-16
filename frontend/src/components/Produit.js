import React from 'react'
import { Card} from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'
//we destractured the produit prop we could do props.produit but like this we only do it once
function Produit({produit}) {
    return (
        <Card className="my-3    rounded"  >
           
            <Card.Img variant="top" src={process.env.REACT_APP_API_URL+'/static'+produit.produit_nom.image} style={{height:"15vw"}}/>
         <Card.Body>
      
            <Card.Title  as="div">
             <strong >{produit.produit_nom.nom}</strong>  
                </Card.Title>
        
         
          
            <Card.Text as="div">
                <strong>
                <i class="fas fa-money-bill-wave"></i> <strong>{produit.prix} DA </strong>
            </strong>
            </Card.Text>
         </Card.Body>
        </Card>
    )
}

export default Produit
