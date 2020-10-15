/** @format */

import axios from 'axios';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';

const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

export const me = () => {
	return async (dispatch) => {
		try {
			const res = await axios.get(
				'https://gobark-backend.herokuapp.com/auth/me'
			);
			dispatch(getUser(res.data || defaultUser));
		} catch (err) {
			console.error(err);
		}
	};
};

//login/signup
export const login = (email, password) => async (dispatch) => {
	try {
		let object = { email, password };

		let res = await axios.post(
			`https://gobark-backend.herokuapp.com/auth/login`,
			object
		);

		console.log('res in redux1', res.data);
		dispatch(getUser(res.data));
	} catch (dispatchOrHistoryErr) {
		console.error(dispatchOrHistoryErr);
	}
};


//logout
export const logout = () => async (dispatch) => {
	try {
		await axios.post('https://gobark-backend.herokuapp.com/auth/logout');
		dispatch(removeUser());
		history.push('/login');
	} catch (err) {
		console.error(err);
	}
};

//edit user
export const updateUser = (id, stateObj) => {
	return async (dispatch, getState) => {
		try {
			await axios.put(`https://gobark-backend.herokuapp.com/auth/me`, stateObj);
			dispatch({
				type: UPDATE_USER,
				id,
				stateObj,
				state: getState,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

const defaultUser = {};

export default function userReducer(state = defaultUser, action) {
	switch (action.type) {
		case GET_USER:
			return action.user;
		case REMOVE_USER:
			return defaultUser;
		// case UPDATE_USER:
		// 	return {
		// 		...state,
		// 		firstName: action.stateObj.firstName,
		// 		lastName: action.stateObj.lastName,
		// 		email: action.stateObj.email,
		// 		imageUrl: action.stateObj.imageUrl,
		// 	};
		default:
			return state;
	}
}
