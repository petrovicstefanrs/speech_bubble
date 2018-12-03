import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import {authReducer} from '../redux/auth';
import {toastReducer} from '../redux/toast';

const rootReducer = history =>
	combineReducers({
		router: connectRouter(history),
		auth: authReducer,
		toast: toastReducer,
	});

export default rootReducer;
