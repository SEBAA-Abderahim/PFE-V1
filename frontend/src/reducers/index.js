  
import { combineReducers } from 'redux';
import auth from './auth';
import {magasinListReducer} from './mag';
import {magasinDetailsReducer} from './mag';
import {magasinReviewCreateReducer} from './mag';
import {magasinVisiteCreateReducer} from './mag';

export default combineReducers({
    auth,
    magasinList:magasinListReducer,
    magasinDetails:magasinDetailsReducer,
    magasinReviewCreate:magasinReviewCreateReducer,
    magasinVisiteCreate:magasinVisiteCreateReducer
});