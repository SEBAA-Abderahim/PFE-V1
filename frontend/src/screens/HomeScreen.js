import React from 'react'
import  magasins from '../magasins'
import {Col,Row,Carousel,Button  } from 'react-bootstrap'
import Magasin from '../components/Magasin'

//  <Col sm={12} md={6} lg={4} xl={3}> here we used the bootstrap grid system to mean 12 col for one preoduct(full width)
//in small screen 6 in medium 4 in large 3 in extra large

function HomeScreen() {
    return (
        <div>
 
    <Carousel >
    
  <Carousel.Item interval={5000} style={{height:"30vw"}}>
    <img
      className="d-block w-100"
      src="/images/slide-1.jpg"
      alt="First slide"
      style={{height:"30vw"}}
    />
     <Carousel.Caption>
      <h1 style={{color:"silver"}}> ShopsDZ</h1>
      <p>Bienvenue en Algérie</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={5000} style={{height:"30vw"}}>
    <img
      className="d-block w-100"
      src="/images/slide-2.jpg"
      alt="Second slide"
      style={{height:"30vw"}}
    />
    
  </Carousel.Item>
  <Carousel.Item style={{height:"30vw"}} interval={5000}>
    <img
      className="d-block w-100"
      src="/images/slide-3.jpg"
      alt="Third slide"
      style={{height:"30vw"}}
    />
  
  </Carousel.Item>
  
  <Carousel.Item style={{height:"30vw"}} interval={5000}>
    <img
      className="d-block w-100"
      src="/images/slide-4.jpg"
      alt="Third slide"
      style={{height:"30vw"}}
    />
  
  </Carousel.Item>
</Carousel>

  <Button className='btn btn-dark my-3' size="md" block>
    Nos magasins
  </Button>
            <Row>
                {magasins.map(magasin=>(
                    <Col  className="col-lg-4 d-flex align-items-stretch"  key={magasin._id} sm={12} md={6} lg={4} xl={3} >
                    <Magasin magasin={magasin}/>
                    </Col>
                ))

                }
            </Row>
            
        </div>
    )
}

export default HomeScreen
