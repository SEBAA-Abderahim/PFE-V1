import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ShopScreen from './screens/ShopScreen'
import  Login from './screens/Login'
import SignUp from './screens/SignUp'
import ResetPassword from './screens/ResetPassword'
import ResetPasswordConfirm from './screens/ResetPasswordConfirm'
import Activate from './screens/Activate'
import {BrowserRouter as Router,Route,Switch,withRouter  }from 'react-router-dom'
import Layout from './hocs/layout';
//for redux store
import { Provider } from 'react-redux';
import store from './store';


//https://mdbootstrap.com/docs/b5/react/utilities/spacing/ to see what classname ="py-3" means
//for ex here p means padding and y means top and bottom nd 3 the size of padding
//--------------exact added to the first route cause we started with '/'

function App() {

  return (
  
    <Provider store={store}>
 
        <Router >
     
          <Layout>
                <Switch>
            <Route path='/' component={HomeScreen}  exact/>
            <Route path='/magasin/:id' component={ShopScreen} />
            <Route path='/login' component={Login} />
            <Route path='/activate/:uid/:token' component={Activate} />
            <Route path='/signup' component={SignUp} />
            <Route path='/reset-password' component={ResetPassword} />
            <Route path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />

            </Switch>
            </Layout>
          
          
        </Router>

    </Provider>
  );
}

export default App;
