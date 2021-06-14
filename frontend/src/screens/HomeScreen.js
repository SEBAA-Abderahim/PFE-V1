import React,{ useState, useEffect } from 'react'
import  magasins from '../magasins'
import {Col,Row,Button  } from 'react-bootstrap'
import Magasin from '../components/Magasin'
import CarouselHome from '../components/CarouselHome'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listMagasins } from '../actions/mag'
import { useDispatch, useSelector } from 'react-redux'
import Carousel  from "react-multi-carousel"
//  <Col sm={12} md={6} lg={4} xl={3}> here we used the bootstrap grid system to mean 12 col for one preoduct(full width)
//in small screen 6 in medium 4 in large 3 in extra large

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
function HomeScreen({ history,match }) {

    const dispatch = useDispatch()
    const magasinList = useSelector(state => state.magasinList)
    const { error, loading, magasins, page, pages,rec1,rec2 } = magasinList

    let keyword = history.location.search


    useEffect(() => {
        dispatch(listMagasins(keyword))

    }, [dispatch, keyword])
    return (
        <div>
  {!keyword &&   <CarouselHome/>}
 
  <Button className='btn btn-dark my-3' size="md" block>
    Nos magasins
  </Button>
  {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                :
                <div>
            <Row>
                {magasins.map(magasin=>(
                    <Col  className="col-lg-4 d-flex align-items-stretch"  key={magasin._id} sm={12} md={6} lg={4} xl={3} >
                    <Magasin magasin={magasin} keyword={keyword?keyword.split('keyword=').pop().split('&')[0]!==""?keyword.split('keyword=').pop().split('&')[0]:undefined:undefined}/>
                    </Col>
                ))

                }
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword} screen="home" />


            {rec1&&rec1.length>0&& <Button className='btn btn-dark my-3' size="md" block>
    Recommandation par expansion
  </Button>
            }
           
             {(() => {
              if (rec1&&rec1.length>0){
              
              
        
           
        return(
             
  
            <Carousel responsive={responsive} >
       
         
            {
       
              rec1.map(m=>(
                
             <Col className=" d-flex align-self-stretch "   key={m._id}  md={11}  >

                    <Magasin magasin={m} keyword={keyword?keyword.split('keyword=').pop().split('&')[0]!==""?keyword.split('keyword=').pop().split('&')[0]:undefined:undefined}/>
                    </Col>
                  
                ))
              
                }
        
              
            
       
</Carousel>

        )}    return null;
      })()}

            {rec2&&rec2.length>0&& <Button className='btn btn-dark my-3' size="md" block>
    Recommandation guidé
  </Button>
            }
           
             {(() => {
              if (rec2&&rec2.length>0){
              
              
        
           
        return(
             
  
            <Carousel responsive={responsive}>
       
         
            {
       
              rec2.map(mag=>(
                
             <Col className=" d-flex align-items-stretch my-3    h-200"   key={mag._id}  md={11}  >

                    <Magasin magasin={mag} keyword={keyword?keyword.split('keyword=').pop().split('&')[0]!==""?keyword.split('keyword=').pop().split('&')[0]:undefined:undefined}/>
                    </Col>
                  
                ))
              
                }
        
              
            
       
</Carousel>

        )}    return null;
      })()}
    
  


   
    
            </div>}
        </div>
    )
}

export default HomeScreen
