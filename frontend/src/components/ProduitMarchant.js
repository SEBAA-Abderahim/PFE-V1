import React, { useState, useEffect } from 'react'
import { Card,Button,Form,Col} from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'
import Loader from './Loader'
import axios from 'axios'
//we destractured the produit prop we could do props.produit but like this we only do it once
function ProduitMarchant({produit}) {


    const [uploading,setUploading]=useState(false)
    const [prix,setPrix]=useState(produit.prix)
const delete_Produit=async(e)=>{
  if (window.confirm('etes vous sure de vouloir supprimer ce profuit?')) {
  e.preventDefault();
  try {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`
        }
    }

    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/produits/delete/${produit._id}`, config)



    setUploading(false)
    

    

} catch (error) {
    setUploading(false)
    console.log(error)

   
  
}


}
else{
setUploading(false)
}
}

//update prix
const update_Produit=async(e)=>{
 
    e.preventDefault();
    try {
      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('access')}`
          }
      }
  
      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/produits/update/${produit._id}`,{'prix':prix} ,config)
  
  
  
      setUploading(false)
      
  
      
  
  } catch (error) {
      setUploading(false)
      console.log(error)
  
     
    
  }
  
  
  
  
  }
    return (
        <div>
        {uploading?<Loader />:(
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
            <Form onSubmit={e=>update_Produit(e)}>
                <Form.Row>
 
          
    <Col    sm={5}>
    <Form.Control type="text" 
 
    pattern="(^[+-]?([0-9]*[.])?[0-9]+$)"
    step="any"
    maxlength="15"
    validate="true"
    placeholder="Entrer le prix du produit" 
     name='prix' value={prix} onChange={e=>setPrix(e.target.value)}  required />
 </Col>
  
 
  <Col>
                               <Button type='submit' variant='primary' size="sm"  className='btn btn-dark my-2'>
                               modifier prix 
                        </Button>           
                        </Col>
                        </Form.Row>                   
     </Form>
            
            <Button className='btn btn-dark my-3'    onClick={e=>delete_Produit(e)} block>
   <i class="fas fa-trash-alt"></i>
  </Button>
         </Card.Body>
        </Card>)}
        </div>
    )
}

export default ProduitMarchant
