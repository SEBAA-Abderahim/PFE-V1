import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Row,Col,Image,ListGroup,Button,Card,Form} from 'react-bootstrap'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { listMagasinDetails } from '../actions/mag'
function CreateProduit({user,isAuthenticated,history,match}) {
  const dispatch = useDispatch()
  const magasinDetails = useSelector(state => state.magasinDetails)
  const { loading, error, magasin } = magasinDetails
    const [categories, setCategories] = useState([])
    const [produits, setProduits] = useState([])
    const [display, setDisplay] = useState("None")
    const [errorr,setErrorr]=useState(null)
//fecth wilaya and categories
const getCat=   ()=>{
 axios.get(`${process.env.REACT_APP_API_URL}/api/categories/`)
  .then(response => {
    setCategories(response.data );
   
  })
  .catch(error => console.log(error.response));


}

//fecth produit after categorie select
const getProduits=   (e)=>{
  setFormData({ ...formData, [e.target.name]: e.target.value });
    if(e.target.value!=''){
      
    axios.get(`${process.env.REACT_APP_API_URL}/api/produits/${e.target.value}/list-produits/`)
     .then(response => {
       setProduits(response.data);
      
     }).catch(error => console.log(error.response));
     setDisplay("block");
    }
    else{
        setDisplay("none")
    }
   }

   //handeling data send
   const [formData, setFormData] = useState({});

const {  
categorie,
produit,
prix,
nouveauproduit,
image

} = formData;
//seting our state  from the target (our input field) value
function transformInToFormObject(data) {
    let formData = new FormData();
    for (let key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach((obj, index) => {
          let keyList = Object.keys(obj);
          keyList.forEach((keyItem) => {
            let keyName = [key, "[", index, "]", ".", keyItem].join("");
            formData.append(keyName, obj[keyItem]);
          });
        });
      } else if (typeof data[key] === "object") { 
        for (let innerKey in data[key]) {
          formData.append(`${key}.${innerKey}`, data[key][innerKey]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }
    return formData;
  }
const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
const [uploading,setUploading]=useState(false)
  const onSubmit=async(e)=>{
    e.preventDefault()
   
 
    setUploading(true)
    var form = transformInToFormObject(formData);
    image&& form.append('image',image)
   
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `JWT ${localStorage.getItem('access')}`
            }
        }

        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/produits/create/${match.params.id}`, form, config)


   
        setUploading(false)
        history.push(`/marchant/magasin/${match.params.id}`)

    } catch (error) {
        setUploading(false)
        //console.log(error)
        error.response && error.response.data.detail
        ?  setErrorr(error.response.data.detail)
        : setErrorr(error.message)
       console.log(formData)
      
    }
  }


  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]

    setFormData({ ...formData, 'image':  file })



    
}

    useEffect(() => {
  
      dispatch(listMagasinDetails(match.params.id));

        getCat();
     
        
    
    },[dispatch,match.params.id])



    
    if (isAuthenticated==false) {
  
      history.replace('/')
      
    }
    else{
      if(user&&magasin.user){
        if(user&&magasin.user!==user.id) history.replace('/')
      }
    }
    return (
        <div>
               {uploading||loading ? <Loader />:error? 
                <Message variant='danger'>{error}</Message>:
               <div>
                  <Button className='btn btn-dark my-3' size="md" block>
    Ajouter un produit
  </Button>
{errorr && <Message variant='danger'>{errorr}</Message>
  
}

            <Form onSubmit={e=>onSubmit(e)}>
         
      
             <Form.Group controlId='categorie'>
                                                        <Form.Label>Catégorie</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={categorie}
                                                            name="categorie"
                                                            onChange={getProduits}
                                                        required
                                                        >
                                                            <option value=''>Selectionez...</option>
                                                            {categories.map(categorie=>(
                    <option  value={categorie._id} key={categorie._id}  >
                    {categorie.nom}
                    </option>
                ))

                }
                                                        </Form.Control>

                                                    </Form.Group>



 
                                                    

             {produits&&

                                                    <Form.Group controlId='produit' style={{display:display}} >
                                                        <Form.Label>produit</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={produit}
                                                            name="produit"
                                                            onChange={e=>onChange(e)}
                                                        >
                                                            <option value=''>Selectionez...</option>
                                                            {produits.map(produit=>(
                    <option  value={produit._id} key={produit._id}  >
                    {produit.nom}
                    </option>
                ))

                }
                                                        </Form.Control>
                                                    </Form.Group>}

                                                    <Form.Row>
                                                      Autre:
                                                    <Col>
                                                    <Form.Group controlId="formBasicNom">
    <Form.Label>Nom du produit: </Form.Label>
    <Form.Control type="text" placeholder="Entrer le nom du nouveau produit" 
     name='nouveauproduit' value={nouveauproduit} onChange={e=>onChange(e)}  />

  </Form.Group>
  </Col>
<Col>
   <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                               
                                <Form.Control

type='text'
placeholder='Enter image'
value={image&&image.name}
readonly="readonly"
>
</Form.Control>
                                <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                >

                                </Form.File>
                              

                            </Form.Group>   
                            </Col>
                            </Form.Row>
                            <Form.Group controlId="formBasicPrix">
    <Form.Label>Prix du produit: </Form.Label>
    <Form.Control type="text" 
    
    pattern="(^[+-]?([0-9]*[.])?[0-9]+$)"
    step="any"
    maxlength="15"
    validate="true"
    placeholder="Entrer le prix du produit" 
     name='prix' value={prix} onChange={e=>onChange(e)}  />

  </Form.Group>
                               <Button type='submit' variant='primary'>
                               Ajouter produit
                        </Button>                              
     </Form>
     </div>
     }
     
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated,
    user:state.auth.user
  });
export default connect(mapStateToProps)(CreateProduit)
