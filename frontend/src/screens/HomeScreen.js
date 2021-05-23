import React,{ useState, useEffect } from 'react'
import  magasins from '../magasins'
import {Col,Row,Carousel,Button  } from 'react-bootstrap'
import Magasin from '../components/Magasin'
import CarouselHome from '../components/CarouselHome'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listMagasins } from '../actions/mag'
import { useDispatch, useSelector } from 'react-redux'
//  <Col sm={12} md={6} lg={4} xl={3}> here we used the bootstrap grid system to mean 12 col for one preoduct(full width)
//in small screen 6 in medium 4 in large 3 in extra large

function HomeScreen({ history }) {

    const dispatch = useDispatch()
    const magasinList = useSelector(state => state.magasinList)
    const { error, loading, magasins, page, pages } = magasinList

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
                    <Magasin magasin={magasin}/>
                    </Col>
                ))

                }
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword} screen="home" />
            </div>}
        </div>
    )
}

export default HomeScreen
