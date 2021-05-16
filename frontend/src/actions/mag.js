import axios from 'axios'
import {
    MAGASIN_LIST_REQUEST,
    MAGASIN_LIST_SUCCESS,
    MAGASIN_LIST_FAIL,
    MAGASIN_DETAILS_REQUEST,
    MAGASIN_DETAILS_SUCCESS,
    MAGASIN_DETAILS_FAIL
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