/** @format */

import axios from 'axios';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';
const ADD_POINTS = 'ADD_POINTS';
const MY_DOG = 'MY_DOG';
const UPDATE_DOG = 'UPDATE_DOG';
const ADD_FOLLOW = 'ADD_FOLLOW';
const REMOVE_FOLLOW = 'REMOVE_FOLLOW';

const removeUser = () => ({ type: REMOVE_USER });

//add following
export const addFollowing = (id, obj) => {
	return async (dispatch, getState) => {
		try {
			let res = await axios.put(
				`https://gobark-backend.herokuapp.com/auth/me/${id}`,
				obj
			);
			dispatch({
				type: ADD_FOLLOW,
				obj: obj,
				state: getState,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

//remove following
export const removeFollowing = (id, obj) => {
	return async (dispatch, getState) => {
		try {
			await axios.post(
				`https://gobark-backend.herokuapp.com/auth/me/${id}`,
				obj
			);
			await dispatch({
				type: REMOVE_FOLLOW,
				obj,
				state: getState,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

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
export const login = (email, password) => async (dispatch, getState) => {
	try {
		let object = { email, password };

		let res = await axios.post(
			`https://gobark-backend.herokuapp.com/auth/login`,
			object
		);

		dispatch({
			type: GET_USER,
			user: res.data,
			state: getState,
		});
	} catch (err) {
		console.log(err);
	}
};

// signup;
export const signup = (email, password) => async (dispatch, getState) => {
	try {
		let object = { email, password };

		let res = await axios.post(
			`https://gobark-backend.herokuapp.com/auth/signup`,
			object
		);
		dispatch({
			type: GET_USER,
			user: res.data,
			state: getState,
		});
	} catch (dispatchOrHistoryErr) {
		console.log(dispatchOrHistoryErr);
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

//update the user's dog
export const updateDog = (nameObj, id) => {
	return async (dispatch, getState) => {
		try {
			await axios.put(
				`https://gobark-backend.herokuapp.com/api/dogs/${id}`,
				nameObj
			);
			dispatch({
				type: UPDATE_DOG,
				nameObj,
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
				dog: { ...state.dog, name: action.stateObj.name },
			};
		case UPDATE_DOG:
			return {
				...state,
				dog: {
					...state.dog,
					name: action.nameObj.name,
					color: action.nameObj.color,
				},
			};
		case ADD_FOLLOW:
			if (state.following) {
				return {
					...state,
					following: [...state.following, action.obj],
				};
			} else {
				return {
					...state,
					following: [action.obj],
				};
			}
		case REMOVE_FOLLOW:
			return {
				...state,
				following: [
					...state.following.filter((user) => {
						return user.id !== action.obj.id;
					}),
				],
			};
		default:
			return state;
	}
}
