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
    DELETE_ERROR_MAG


} from './types';

export const listMagasins = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: MAGASIN_LIST_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/magasins/${keyword}`)

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