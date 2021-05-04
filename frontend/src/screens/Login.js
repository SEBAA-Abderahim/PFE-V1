import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Form,Button} from 'react-bootstrap'
import { login } from '../actions/auth';
function Login({login,isAuthenticated}) {
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

    return (
       <div>
            <Button className='btn btn-dark my-3' size="md" block>
    Se Connceter
  </Button>
       <Form onSubmit={e=>onSubmit(e)}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" 
     name='email' value={email} onChange={e=>onChange(e)} required  />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password"
      name='password'
      value={password}
      onChange={e => onChange(e)}
      minLength='6'
      required
    />
  </Form.Group>

  <Button variant="primary" type="submit" >
    Submit
  </Button>
</Form>
<p className='mt-3'>
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </p>
            <p className='mt-3'>
                Forgot your Password? <Link to='/reset-password'>Reset Password</Link>
            </p>
       </div> 
    )
};

//const mapStateToProps = state => ({
 //   isAuthenticated: state.auth.isAuthenticated
//});
//The connect() function connects a React component to a Redux store.
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);
