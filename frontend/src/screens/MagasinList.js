import React,{ useState, useEffect } from 'react'
import  magasins from '../magasins'
import {Col,Row,Carousel,Button  } from 'react-bootstrap'
import MagasinMarchant from '../components/MagasinMarchant'
import CarouselHome from '../components/CarouselHome'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listMagasinsmarchant } from '../actions/mag'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux';
import { Redirect,Link } from 'react-router-dom';


function MagasinList({ history,user ,isAuthenticated}) {
 
    const dispatch = useDispatch()
    const magasinListMarchant = useSelector(state => state.magasinListMarchant)
    const { error, loading, magasins, page, pages } = magasinListMarchant

  let pageNum=history.location.search


    useEffect(() => {
       
        dispatch(listMagasinsmarchant(pageNum))

    }, [dispatch,pageNum])
    if (isAuthenticated==false||(user&&!user.is_merchant)) {
        return <Redirect to='/' />
    }
    return (
        <div>
 
 
  <Button className='btn btn-dark my-3' size="md" block>
 Vos magasins
  </Button>
  <Link to='/create-magasin/' >  <Button className='btn btn-dark my-3' size="md" block>
Ajouter un nouveau magasin
  </Button></Link>
  {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                :
                <div>
            <Row>
                {magasins.map(magasin=>(
                    <Col  className="col-lg-4 d-flex align-items-stretch"  key={magasin._id} sm={12} md={6} lg={4} xl={3} >
                    <MagasinMarchant magasin={magasin}/>
                    </Col>
                ))

                }
            </Row>
            <Paginate page={page} pages={pages}  screen="marchant" />
            </div>}
        </div>
    )
}
const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated,
    user:state.auth.user
  });
export default connect(mapStateToProps)(MagasinList)