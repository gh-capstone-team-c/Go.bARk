/** @format */

import axios from 'axios';

const GET_USERS = 'GET_USERS';


const getAllUsers = (users) => {
	return {
		type: GET_USERS,
		users,
	};
};

export const getUsers = () => {
	return async (dispatch) => {
		const response = await axios.get(
			'https://gobark-backend.herokuapp.com/api/users'
		);
		dispatch(getAllUsers(response.data));
	};
};



export default function allUsersReducer(state = [], action) {
	switch (action.type) {
		case GET_USERS:
			return action.users;
		default:
			return state;
	}
}
