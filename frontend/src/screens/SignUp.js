  
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup,delete_err,delete_msg,create_msg,create_err } from '../actions/auth';
import Message from '../components/Message';
import {Form,Button} from 'react-bootstrap'
function SignUp({ signup, isAuthenticated,error,message,delete_err,delete_msg,create_msg,create_err }) {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        username:'',
        email: '',
        password: '',
        re_password: ''
    });

    const { username, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(username, email, password, re_password);
            setAccountCreated(true);
        }else{
          create_err("les deux mot de passe doivent etre egaux");
        }
    };

  



    if (isAuthenticated) {
        return <Redirect to='/' />
    }
    return (
        <div>
<Button className='btn btn-dark my-3' size="md" block>
 Création d'un nouveau compte
 </Button>
 <div Style={"display: none;"}>
  {(() => {
              if (error){
        return(
          setTimeout(function(){ delete_err(); }, 10000)
        )}    return null;
      })()}
      </div>
      <div Style={"display: none;"}>
  {(() => {
              if (message){
        return(
          setTimeout(function(){ delete_msg(); }, 10000)
        )}    return null;
      })()}
      </div>
 {error && <Message variant='danger'>{error}</Message>
  
}
{message && <Message variant='success'>{message}</Message>
  
}
 <Form onSubmit={e=>onSubmit(e)}>
 <Form.Group controlId="formBasicUserName">
    <Form.Label>Nom d'utilisateur </Form.Label>
    <Form.Control   
                        type='text'
                        placeholder='username*'
                        name='username'
                        value={username}
                        onChange={e => onChange(e)}
                        required  />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email </Form.Label>
    <Form.Control type="email" placeholder="Enter email*" 
     name='email' value={email} onChange={e=>onChange(e)} required  />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
   <Form.Group controlId="formBasicPassword">
     <Form.Label>Mot de passe </Form.Label>
     <Form.Control    
                        type='password'
                        placeholder='Password*'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required  />

   </Form.Group>
   <Form.Group controlId="formBasicPassword">
     <Form.Label>Confirmation du nouveau mot de passe</Form.Label>
     <Form.Control                             
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required />

   </Form.Group>
   <Button variant="primary" type="submit" >
     Créez votre mot de passe
   </Button>
         </Form>
        </div>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    message: state.auth.message
});
export default connect(mapStateToProps, { signup,delete_err,delete_msg,create_msg,create_err })(SignUp)
