import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    DELETE_MESSAGE,
    DELETE_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    CREATE_MESSAGE,
    CREATE_ERROR
 
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    error: null,
    message:null
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case LOGIN_SUCCESS:
                localStorage.setItem('access', payload.access);
                localStorage.setItem('refresh', payload.refresh);
                return {
                    ...state,
                    isAuthenticated: true,
                    access: payload.access,
                    refresh: payload.refresh,
                    error:null
                }
                
                case USER_LOADED_SUCCESS:
                    return {
                        ...state,
                        user: payload
                    }

                case USER_LOADED_FAIL:
                    return {
                        ...state,
                        user: null
                    }
        case LOGIN_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case AUTHENTICATED_SUCCESS:
                return {
                    ...state,
                    isAuthenticated: true
                }
        case AUTHENTICATED_FAIL:
                return {
                    ...state,
                    isAuthenticated: false
                }

                case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                error:null
            }
            case PASSWORD_RESET_SUCCESS:
            case PASSWORD_RESET_CONFIRM_SUCCESS:
                    return {
                        ...state,
                        message: action.payload
                    }
            case PASSWORD_RESET_FAIL:
             case PASSWORD_RESET_CONFIRM_FAIL:
                    return {
                        ...state,
                        error: action.payload
                    }
            case DELETE_MESSAGE:
            return {
                        ...state,
                        message: null
                               }
            case DELETE_ERROR:
            return {
                        ...state,
                        error: null
                                } 
            case  CREATE_MESSAGE:
                return {
                            ...state,
                            message: action.payload
                                    }
                case  CREATE_ERROR:
                return {
                            ...state,
                            error: action.payload
                                    }      
            case SIGNUP_SUCCESS:
                return {
                    ...state,
                    isAuthenticated: false,
                    message: action.payload
                }    
            case SIGNUP_FAIL:
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                return {
                    ...state,
                    access: null,
                    refresh: null,
                    isAuthenticated: false,
                    user: null,
                    error:action.payload
                }        
            default:
                return state
        }
};