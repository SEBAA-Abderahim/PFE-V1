  
import { combineReducers } from 'redux';
import auth from './auth';
import {magasinListReducer} from './mag';
import {magasinDetailsReducer} from './mag';
export default combineReducers({
    auth,
    magasinList:magasinListReducer,
    magasinDetails:magasinDetailsReducer,
});