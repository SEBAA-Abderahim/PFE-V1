import React, { useEffect } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import { Container } from 'react-bootstrap'
const Layout = ({ checkAuthenticated, load_user,children }) => {
    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, []);

    return (

       <div>
                <Header/>
                <main className="py-3">
        <Container>
                {children}
                </Container>
      
      </main>
                <Footer/>
       </div>

    );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);