/** @format */

import axios from 'axios';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';
const ADD_POINTS = 'ADD_POINTS';
const MY_DOG = 'MY_DOG';

const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

//add points
export const addPoints = (stateObj) => {
	return async (dispatch, getState) => {
		try {
			await axios.put('https://gobark-backend.herokuapp.com/auth/me', stateObj);
			dispatch({
				type: ADD_POINTS,
				stateObj,
				state: getState,
			});
			console.log('stateobj in redux', stateObj);
		} catch (err) {
			console.log(err);
		}
	};
};

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

//login
export const login = (email, password) => async (dispatch) => {
	try {
		let object = { email, password };

		let res = await axios.post(
			`https://gobark-backend.herokuapp.com/auth/login`,
			object
		);

		dispatch(getUser(res.data));
	} catch (dispatchOrHistoryErr) {
		console.error(dispatchOrHistoryErr);
	}
};

// signup;
export const signup = (email, password) => async (dispatch) => {
	try {
		let object = { email, password };

		let res = await axios.post(
			`https://gobark-backend.herokuapp.com/auth/signup`,
			object
		);
		dispatch(getUser(res.data));
	} catch (dispatchOrHistoryErr) {
		console.error(dispatchOrHistoryErr);
	}
};

//associate a newly signed up user to their new dog
export const myDog = (dog) => {
	return async (dispatch, getState) => {
		try {
			await axios.post('https://gobark-backend.herokuapp.com/auth/me', dog);

			dispatch({
				type: MY_DOG,
				dog,
				state: getState,
			});
		} catch (err) {
			console.log(err);
		}
	};
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
export const updateUser = (stateObj) => {
	return async (dispatch, getState) => {
		try {
			await axios.put(`https://gobark-backend.herokuapp.com/auth/me`, stateObj);
			dispatch({
				type: UPDATE_USER,
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
		case ADD_POINTS:
			return { ...state, points: action.stateObj.points };
		case MY_DOG:
			return { ...state, dog: action.dog };
		case UPDATE_USER:
			return {
				...state,
				email: action.stateObj.email,
				//dog isn't persisting in the db. need to fix!
				dog: { ...state, name: action.stateObj.name },
			};
		default:
			return state;
	}
}
