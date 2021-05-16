import {
    MAGASIN_LIST_REQUEST,
    MAGASIN_LIST_SUCCESS,
    MAGASIN_LIST_FAIL,
    MAGASIN_DETAILS_REQUEST,
    MAGASIN_DETAILS_SUCCESS,
    MAGASIN_DETAILS_FAIL
} from '../actions/types';


export const magasinListReducer = (state = { magasins: [] }, action) => {
    switch (action.type) {
        case MAGASIN_LIST_REQUEST:
            return { loading: true, magasins: [] }

        case MAGASIN_LIST_SUCCESS:
            return {
                loading: false,
                magasins: action.payload.magasins,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case MAGASIN_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const magasinDetailsReducer = (state = { magasin: { reviews: [],produits:[] } }, action) => {
    switch (action.type) {
        case MAGASIN_DETAILS_REQUEST:
            return { loading: true, ...state }

        case MAGASIN_DETAILS_SUCCESS:
            return { loading: false, magasin: action.payload }

        case MAGASIN_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}