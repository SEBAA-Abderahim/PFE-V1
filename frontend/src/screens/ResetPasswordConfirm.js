import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm ,delete_err,delete_msg,create_msg,create_err} from '../actions/auth';
import {Form,Button} from 'react-bootstrap'
import Message from '../components/Message';
function ResetPasswordConfirm({ match, reset_password_confirm ,error,message,delete_err,delete_msg,create_msg,create_err,isAuthenticated}) {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;
        if (new_password === re_new_password ) {
        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
        }else{
          create_err("les deux mot de passe doivent etre egaux");
        }
    };
    /*
    if (requestSent) {
        return <Redirect to='/' />
    }
    */
    if (isAuthenticated) {
      return <Redirect to='/' />
  }
    return (
        <div>

         
         <Button className='btn btn-dark my-3' size="md" block>
 Confirmation de Rénetialiser le mot de passe
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
   <Form.Group controlId="formBasicPassword">
     <Form.Label>Nouveau mot de passe </Form.Label>
     <Form.Control      type='password'
                        placeholder='New Password'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required  />

   </Form.Group>
   <Form.Group controlId="formBasicPassword">
     <Form.Label>Confirmation du nouveau mot de passe</Form.Label>
     <Form.Control     
                        type='password'
                        placeholder='Confirm New Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required />

   </Form.Group>
   <Button variant="primary" type="submit" >
     Rénitialiser le mot de passe
   </Button>
         </Form>

       
        </div>
    )
}
const mapStateToProps = state => ({

    error: state.auth.error,
    message: state.auth.message,
    isAuthenticated: state.auth.isAuthenticated
  });
export default connect(mapStateToProps, { reset_password_confirm,delete_err,delete_msg,create_msg,create_err })(ResetPasswordConfirm)
