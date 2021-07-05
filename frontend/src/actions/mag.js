import axios from 'axios'
import {
    MAGASIN_LIST_REQUEST,
    MAGASIN_LIST_SUCCESS,
    MAGASIN_LIST_FAIL,
    MAGASIN_DETAILS_REQUEST,
    MAGASIN_DETAILS_SUCCESS,
    MAGASIN_DETAILS_FAIL,
    MAGASIN_CREATE_REVIEW_REQUEST,
    MAGASIN_CREATE_REVIEW_SUCCESS,
    MAGASIN_CREATE_REVIEW_FAIL,
    DELETE_MESSAGE_MAG,
    DELETE_ERROR_MAG,
    MAGASIN_CREATE_VISITE_REQUEST,
    MAGASIN_CREATE_VISITE_SUCCESS,
    MAGASIN_CREATE_VISITE_FAIL,
    MAGASINMarchant_LIST_REQUEST,
    MAGASINMarchant_LIST_SUCCESS,
    MAGASINMarchant_LIST_FAIL,
    MAGASIN_CREATE_REQUETE_REQUEST,
    MAGASIN_CREATE_REQUETE_SUCCESS, 
    MAGASIN_CREATE_REQUETE_FAIL, 
    MAGASIN_CREATE_REQUETE_RESET 



} from './types';

export const listMagasins = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: MAGASIN_LIST_REQUEST })
        let req=[]
        let k=keyword?keyword.split('keyword=').pop().split('&')[0]!==""?keyword.split('keyword=').pop().split('&')[0]:undefined:undefined
        if(keyword&&k&&k!==""){
            
            k=k.replace("%20"," ")
         req=JSON.parse(localStorage.getItem(k.trim().toLowerCase())) || [];
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/magasins/${keyword}`,{"req":req})

        dispatch({
            type: MAGASIN_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MAGASIN_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listMagasinDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: MAGASIN_DETAILS_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/magasins/${id}/`)

        dispatch({
            type: MAGASIN_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MAGASIN_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createMagasinReview = (magasinId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MAGASIN_CREATE_REVIEW_REQUEST
        })


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('access')}`
            }
        }

        const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/magasins/${magasinId}/reviews/`,
            review,
            config
        )
        dispatch({
            type: MAGASIN_CREATE_REVIEW_SUCCESS,
            payload: data,
        })



    } catch (error) {
        dispatch({
            type: MAGASIN_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const delete_msgMag=() => dispatch => {
    dispatch({
        type: DELETE_MESSAGE_MAG
    });
};
export const delete_errMag=() => dispatch => {
    dispatch({
        type: DELETE_ERROR_MAG
    });
};

//visite create action
export const createMagasinVisite = (magasinId, time) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MAGASIN_CREATE_VISITE_REQUEST
        })


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('access')}`
            }
        }

        const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/magasins/${magasinId}/visites/`,
            time,
            config
        )
        dispatch({
            type: MAGASIN_CREATE_VISITE_SUCCESS,
            payload: data,
        })



    } catch (error) {
        dispatch({
            type: MAGASIN_CREATE_VISITE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const listMagasinsmarchant = (page=1) => async (dispatch) => {
    try {
        dispatch({ type: MAGASINMarchant_LIST_REQUEST })
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('access')}`
            }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/magasins/marchant${page}`,config)

        dispatch({
            type: MAGASINMarchant_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MAGASINMarchant_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createMagasinRequete = (magasinId, keyword) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MAGASIN_CREATE_REQUETE_REQUEST
        })


        

        const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/magasins/${magasinId}/requetes/`,
            keyword
        )
        dispatch({
            type: MAGASIN_CREATE_REQUETE_SUCCESS,
            payload: data,
        })



    } catch (error) {
        dispatch({
            type: MAGASIN_CREATE_REQUETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


