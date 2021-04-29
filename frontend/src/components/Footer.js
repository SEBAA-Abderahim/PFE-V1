import React from 'react'
import {Container,Col,Row,Button  } from 'react-bootstrap'
function Footer() {
    return (
        <footer className=' my-0 bg-dark text-white'>
           

            <Container bg="dark" variant="dark" expand="lg">
                
                <Row bg="dark">
              <Col className="text-center py-3" bg="dark">
                Copyright &copy; ShopsDZ
                </Col>
                </Row>
               </Container>
            
       
        </footer>
    )
}

export default Footer
