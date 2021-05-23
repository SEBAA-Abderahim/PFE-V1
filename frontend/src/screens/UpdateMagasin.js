import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Row,Col,Image,ListGroup,Button,Card,Form} from 'react-bootstrap'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { listMagasinDetails } from '../actions/mag'
function UpdateMagasin({user,isAuthenticated,history,match}) {
  const dispatch = useDispatch()

  const magasinDetails = useSelector(state => state.magasinDetails)
  const { loading, error, magasin } = magasinDetails
    const [wilayas, setWilayas] = useState([])
    const [categories, setCategories] = useState([])
    const [communes, setCommunes] = useState([])
    const [display, setDisplay] = useState("None")
    const [errorr,setErrorr]=useState(null)
//fecth wilaya and categories
const getWilayasCat=   ()=>{
 axios.get(`${process.env.REACT_APP_API_URL}/api/wilayas/`)
  .then(response => {
    setWilayas(response.data);
    return axios.get(`${process.env.REACT_APP_API_URL}/api/categories/` );
  })
  .then(response => {
    setCategories(response.data );
    
  }).catch(error => console.log(error.response));


}

//fecth commmunes after wilaya select
const getCommunes=   (e)=>{
    if(e.target.value!=''){
    axios.get(`${process.env.REACT_APP_API_URL}/api/wilayas/${e.target.value}/communes/`)
     .then(response => {
       setCommunes(response.data);
      
     }).catch(error => console.log(error.response));
     setDisplay("block");
    }
    else{
        setDisplay("none")
    }
   }

   //handeling data send
   const [formData, setFormData] = useState({});

const {   nom,
overture,
fermeture,
telephone,
adresse,
latitude,
longitude,
commune,
categorie,
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

        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/magasins/${match.params.id}/update`, form, config)


   
        setUploading(false)
        history.push(`/marchant/magasin/${match.params.id}`)

    } catch (error) {
        setUploading(false)
        //console.log(error)
        error.response && error.response.data.detail
        ?  setErrorr(error.response.data.detail)
        : setErrorr(error.message)
       
      
    }
  }


  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]

    setFormData({ ...formData, 'image':  file })



    
}

    useEffect(() => {
      dispatch(listMagasinDetails(match.params.id));
      setFormData({
        nom:magasin.nom,
        overture:magasin.overture,
        fermeture:magasin.fermeture,
        categorie:magasin.categorie&&magasin.categorie._id,
        adresse:magasin.adresse,
        telephone:magasin.telephone,
        latitude:magasin.latitude,
        longitude:magasin.longitude,
        commune:magasin.commune&&magasin.commune.id,
        



      })

        getWilayasCat();
     
        
    
    },[dispatch,match.params.id])



    useEffect(() => {
   
     

       
     
    


      setFormData({
        nom:magasin.nom,
        overture:magasin.overture,
        fermeture:magasin.fermeture,
        categorie:magasin.categorie&&magasin.categorie._id,
        adresse:magasin.adresse,
        telephone:magasin.telephone,
        latitude:magasin.latitude,
        longitude:magasin.longitude,
        



      })
  
        
    
    },[magasin])
    if (isAuthenticated==false) {
      return <Redirect to='/' />
    }
    return (
        <div>
               {uploading||loading ? <Loader />:error? 
                <Message variant='danger'>{error}</Message>:
               <div>
                  <Button className='btn btn-dark my-3' size="md" block>
    Modifier magasin
  </Button>
{errorr && <Message variant='danger'>{errorr}</Message>
  
}

            <Form onSubmit={e=>onSubmit(e)}>
         
      
            <Form.Group controlId="formBasicNom">
    <Form.Label>Nom du magasin: </Form.Label>
    <Form.Control type="text" placeholder="Entrer le nom du magasin" 
     name='nom' value={nom} onChange={e=>onChange(e)} required  />

  </Form.Group>


  <Form.Group controlId="formBasicOuverture">
    <Form.Label>Ouverture </Form.Label>
    <Form.Control type="time" placeholder="Entrer le temps d'ouverture " 
     name='overture' value={overture} onChange={e=>onChange(e)}  />

  </Form.Group>

  <Form.Group controlId="formBasicFermeture">
    <Form.Label>Fermeture </Form.Label>
    <Form.Control type="time" placeholder="Entrer le temps de fermeture" 
     name='fermeture' value={fermeture} onChange={e=>onChange(e)} />

  </Form.Group>

  <Form.Group controlId="formBasicTéléphone">
    <Form.Label>Téléphpne </Form.Label>
    <Form.Control type="tel" placeholder="Entrer le numero de telephone" 
     name='telephone' value={telephone} onChange={e=>onChange(e)}   />

  </Form.Group>





             <Form.Group controlId='categorie'>
                                                        <Form.Label>Catégorie</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={categorie}
                                                            name="categorie"
                                                            onChange={e=>onChange(e)}
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


                                                    <Form.Group controlId="formBasicAdresse">
    <Form.Label>Adresse </Form.Label>
    <Form.Control type="text" placeholder="Entrer votre adresse" 
     name='adresse' value={adresse} onChange={e=>onChange(e)}  />

  </Form.Group>

 
                                                    <Form.Group controlId='wilaya'>
                                                        <Form.Label>Wilaya</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            onChange={getCommunes}
                                                       
                                                        >
                                                            <option value='' > Selectionez...</option>
                                                            {wilayas.map(wilaya=>(

                    <option  value={wilaya.id} key={wilaya.id}  >
                    {wilaya.nom}
                    </option>
                ))

                }
                                                        </Form.Control>
                                                    </Form.Group>

             {communes&&

                                                    <Form.Group controlId='commune' style={{display:display}} >
                                                        <Form.Label>commune</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={commune}
                                                            name="commune"
                                                            onChange={e=>onChange(e)}
                                                        >
                                                            <option value=''>Selectionez...</option>
                                                            {communes.map(commune=>(
                    <option  value={commune.id} key={commune.id}  >
                    {commune.nom}
                    </option>
                ))

                }
                                                        </Form.Control>
                                                    </Form.Group>}



        <Form.Group controlId="formBasicLatittude">
    <Form.Label>Latittude </Form.Label>
    <Form.Control type="text"  placeholder="Entrer la latitude " 
     name='latitude' value={latitude} onChange={e=>onChange(e)}   />

  </Form.Group>
  <Form.Group controlId="formBasicLongitude">
    <Form.Label>Longitude </Form.Label>
    <Form.Control type="text" inputmode="numeric"  placeholder="Entrer la longitude" 
     name='longitude' value={longitude} onChange={e=>onChange(e)}   />

  </Form.Group>     

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

                               <Button type='submit' variant='primary'>
                               Modifier
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
export default connect(mapStateToProps)(UpdateMagasin)
