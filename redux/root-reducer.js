import { combineReducers } from 'redux';
import usersReducer from './users/usersSlice';
import prescriptionReducer from './prescriptions/prescriptionSlice';

const rootReducer = combineReducers({
    users: usersReducer,
    prescription: prescriptionReducer,
});

export default rootReducer;