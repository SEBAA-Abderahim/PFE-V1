import React from 'react'
import  magasins from '../magasins'
import {Col,Row,Carousel,Button  } from 'react-bootstrap'
import Magasin from '../components/Magasin'
import CarouselHome from '../components/CarouselHome'
//  <Col sm={12} md={6} lg={4} xl={3}> here we used the bootstrap grid system to mean 12 col for one preoduct(full width)
//in small screen 6 in medium 4 in large 3 in extra large

function HomeScreen() {
    return (
        <div>
 
   <CarouselHome/>
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
