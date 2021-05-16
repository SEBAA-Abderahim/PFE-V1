import React from 'react'
import {Col,Row,Carousel,Button  } from 'react-bootstrap'
function CarouselHome() {
    return (
  
             <Carousel >
    
    <Carousel.Item interval={5000} style={{height:"30vw"}}>
      <img
        className="d-block w-100"
        src={`${process.env.REACT_APP_API_URL}/static/images/slide-1.jpg`}
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
        src={`${process.env.REACT_APP_API_URL}/static/images/slide-2.jpg`}
        alt="Second slide"
        style={{height:"30vw"}}
      />
      
    </Carousel.Item>
    <Carousel.Item style={{height:"30vw"}} interval={5000}>
      <img
        className="d-block w-100"
        src={`${process.env.REACT_APP_API_URL}/static/images/slide-3.jpg`}
        alt="Third slide"
        style={{height:"30vw"}}
      />
    
    </Carousel.Item>
    
    <Carousel.Item style={{height:"30vw"}} interval={5000}>
      <img
        className="d-block w-100"
        src={`${process.env.REACT_APP_API_URL}/static/images/slide-4.jpg`}
        alt="Third slide"
        style={{height:"30vw"}}
      />
    
    </Carousel.Item>
  </Carousel>
  
    
    )
}

export default CarouselHome
