/** @format */

import axios from 'axios';

const GET_EVERY_PHOTO = 'GET_EVERY_PHOTO';

const getEveryPhoto = (arr) => ({
	type: GET_EVERY_PHOTO,
	arr,
});

export const fetchEveryPhoto = () => {
	return async (dispatch) => {
		const res = await axios.get(
			`https://gobark-backend.herokuapp.com/api/photos`
		);

		dispatch(getEveryPhoto(res.data));
	};
};

const photos = [];

export default function allPhotosReducer(state = photos, action) {
	switch (action.type) {
		case GET_EVERY_PHOTO:
			return action.arr;
		default:
			return state;
	}
}
