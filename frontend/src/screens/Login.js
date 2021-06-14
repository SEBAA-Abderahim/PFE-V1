import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Form,Button} from 'react-bootstrap'
import { login,delete_err,delete_msg } from '../actions/auth';
import Message from '../components/Message'
function Login({login,isAuthenticated,error,delete_err}) {
  
    const [formData, setFormData] = useState({
        email: '',
        password: '' 
    });
    const { email, password } = formData;
    //seting our state  from the target (our input field) value
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };
    
    //is the user authenticated
    //send them to the home page
    if (isAuthenticated) {
      return <Redirect to='/' />
  }else{
    {error && <Message variant='danger'>{error}</Message>}
  }
    return (
       <div>
         
            <Button className='btn btn-dark my-3' size="md" block>
    Se Connceter
  </Button>
  <div Style={"display: none;"}>
  {(() => {
              if (error){
        return(
          setTimeout(function(){ delete_err(); }, 10000)
        )}    return null;
      })()}
      </div>
  {error && <Message variant='danger'>{error}</Message>
  
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

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Mot de passe</Form.Label>
    <Form.Control type="password" placeholder="Password"
      name='password'
      value={password}
      onChange={e => onChange(e)}
      minLength='6'
      required
    />
  </Form.Group>

  <Button variant="primary" type="submit" >
    se connecter
  </Button>
</Form>
<p className='mt-3'>
                ouvrir un nouveau compte ? <Link to='/signup'>S'inscrire</Link>
            </p>
            <p className='mt-3'>
               mot de passe oublié ? <Link to='/reset-password'>Rénitialiser le mot de passe</Link>
            </p>
       </div> 
    )
};

//const mapStateToProps = state => ({
 //   isAuthenticated: state.auth.isAuthenticated
//});
//The connect() function connects a React component to a Redux store.
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error
});
export default connect(mapStateToProps, { login,delete_err })(Login);
