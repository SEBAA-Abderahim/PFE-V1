import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ShopScreen from './screens/ShopScreen'
import {BrowserRouter as Router,Route }from 'react-router-dom'
//https://mdbootstrap.com/docs/b5/react/utilities/spacing/ to see what classname ="py-3" means
//for ex here p means padding and y means top and bottom nd 3 the size of padding
//--------------exact added to the first route cause we started with '/'

function App() {
  return (
    <Router >
      <Header/>
      <main className="py-3">
        <Container>
        <Route path='/' component={HomeScreen} exact/>
        <Route path='/magasin/:id' component={ShopScreen} />
        </Container>
      
      </main>
      
      <Footer/>
    </Router>
  );
}

export default App;
