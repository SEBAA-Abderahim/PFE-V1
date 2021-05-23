import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ pages, page, keyword = '',screen }) {
    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    return (pages > 1 && (
        <Pagination   className='d-flex flex-row justify-content-center align-items-center'
        style={{ marginTop: '20px' }}>
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={screen=="home"?`/?keyword=${keyword}&page=${x + 1}`:screen=="marchant"&&`/marchant/magasinslist/?page=${x + 1}`}
                >
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
    )
}

export default Paginate
