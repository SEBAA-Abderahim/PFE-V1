import React,{ useState } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password,delete_err,delete_msg } from '../actions/auth';
import {Form,Button} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import Message from '../components/Message';
function ResetPassword({ reset_password,error,message,delete_err,delete_msg,isAuthenticated}) {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        
        setRequestSent(true);
    };
    //const notify = () => toast(" check your email !");
   /* //let history =// useHistory();*/
      
   if (isAuthenticated) {
    return <Redirect to='/' />
}
    return (
        <div>
         
        <Button className='btn btn-dark my-3' size="md" block>
Rénetialiser le mot de passe
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
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email </Form.Label>
    <Form.Control type="email" placeholder="Enter email" 
     name='email' value={email} onChange={e=>onChange(e)} required  />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Button variant="primary" type="submit" >
    Rénitialiser le mot de passe
  </Button>
        </Form>
        <ToastContainer />
        </div>
    )
}
const mapStateToProps = state => ({

    error: state.auth.error,
    message: state.auth.message,
    isAuthenticated: state.auth.isAuthenticated
  });
export default connect(mapStateToProps, { reset_password,delete_err,delete_msg })(ResetPassword)
