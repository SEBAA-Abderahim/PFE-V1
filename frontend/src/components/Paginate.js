import React,{useState} from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ pages, page, keyword = '',screen }) {
    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
   const  [first,setFirst]=useState(pages>10?page>10?page-(10)+1:1:page>pages/2?page-(pages/2)+1:1)
     const [last,setLast]=useState(pages>10?page>10?page:10:page>pages/2?page:pages/2)
     
  const firtspage=(e)=>{
     if(pages>10){
        if(first>2 && last>10){
            setFirst(first-1);
            setLast(last-1);
        }else{
            
          if(last>10){
              setFirst(first-1);
              setLast(last-1);
          }else{
            setFirst(1)
          }
     }}else{
      if(first>2 && last>pages/2){
          setFirst(first-1);
          setLast(last-1);
      }else{
          
        if(last>pages/2){
            setFirst(first-1);
            setLast(last-1);
        }else{
          setFirst(1)
        }
      }
    }
  }
  const lastpage=(e)=>{
      if(last<pages){
    setLast(last+1); setFirst(first+1)
      }
}
    return (pages > 1 && (
        <Pagination   className='d-flex flex-row justify-content-center align-items-center'
        style={{ marginTop: '20px' }}>
            <Pagination.First onClick={e=>firtspage(e)}/>
            {[...Array(pages).keys()].slice(first-1, last).map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={screen=="home"?`/?keyword=${keyword}&page=${x + 1}`:screen=="marchant"&&`/marchant/magasinslist/?page=${x + 1}`}
                >
                    
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    
                </LinkContainer>
                
                
            ))}
         <Pagination.Last onClick={e=>lastpage(e)} />
        </Pagination>
    )
    )
}

export default Paginate
