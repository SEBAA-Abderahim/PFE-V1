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
    MAGASIN_CREATE_REVIEW_RESET,
    DELETE_MESSAGE_MAG,
    DELETE_ERROR_MAG,
    MAGASIN_CREATE_VISITE_REQUEST,
    MAGASIN_CREATE_VISITE_SUCCESS,
    MAGASIN_CREATE_VISITE_FAIL,
    MAGASIN_CREATE_VISITE_RESET,
    MAGASINMarchant_LIST_REQUEST,
    MAGASINMarchant_LIST_SUCCESS,
    MAGASINMarchant_LIST_FAIL,
    MAGASIN_CREATE_REQUETE_REQUEST,
    MAGASIN_CREATE_REQUETE_SUCCESS, 
    MAGASIN_CREATE_REQUETE_FAIL, 
    MAGASIN_CREATE_REQUETE_RESET 
  

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
                pages: action.payload.pages,
                rec1: action.payload.rec1,
                rec2:action.payload.rec2
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

//review
export const magasinReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case MAGASIN_CREATE_REVIEW_REQUEST:
            return { loading: true }

        case MAGASIN_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, }

        case MAGASIN_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case MAGASIN_CREATE_REVIEW_RESET:
            return {}
        case DELETE_MESSAGE_MAG:
            return {
                ...state,
                success: false
            }
        case DELETE_ERROR_MAG:
            return{
              
                    error: null
            }
        default:
            return state
    }
}

//crée visite
export const magasinVisiteCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case MAGASIN_CREATE_VISITE_REQUEST:
            return { loading: true }

        case MAGASIN_CREATE_VISITE_SUCCESS:
            return { loading: false, success: true, }

        case MAGASIN_CREATE_VISITE_FAIL:
            return { loading: false, error: action.payload }

        case MAGASIN_CREATE_VISITE_RESET:
            return {}
        default:
            return state
    }
}



//magasinmarchantreducer

export const magasinListMarchantReducer = (state = { magasins: [] }, action) => {
    switch (action.type) {
        case MAGASINMarchant_LIST_REQUEST:
            return { loading: true, magasins: [] }

        case MAGASINMarchant_LIST_SUCCESS:
            return {
                loading: false,
                magasins: action.payload.magasins,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case MAGASINMarchant_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


//crée requete
export const magasinRequeteCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case MAGASIN_CREATE_REQUETE_REQUEST:
            return { loading: true }

        case MAGASIN_CREATE_REQUETE_SUCCESS:
            return { loading: false, success: true, }

        case MAGASIN_CREATE_REQUETE_FAIL:
            return { loading: false, error: action.payload }

        case MAGASIN_CREATE_REQUETE_RESET:
            return {}
        default:
            return state
    }
}