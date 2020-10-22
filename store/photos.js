/** @format */

import axios from 'axios';

const GET_PHOTOS = 'GET_PHOTOS';
const REMOVE_PHOTOS = 'REMOVE_PHOTOS';
const ADD_PHOTOS = 'ADD_PHOTOS';

const getPhotos = (arrOfObj) => ({ type: GET_PHOTOS, arrOfObj });
const addPhotos = (obj) => ({ type: ADD_PHOTOS, obj });
const removePhoto = (obj) => ({ type: REMOVE_PHOTOS, obj });

export const fetchPhotos = () => {
	return async (dispatch) => {
		const response = await axios.get(
			`https://gobark-backend.herokuapp.com/auth/me/allphotos`
		);
		dispatch(getPhotos(response.data));
	};
};

export const addPhoto = (photo) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(
				`https://gobark-backend.herokuapp.com/auth/me/photo`,
				{
					path: photo,
				}
			);
			dispatch(addPhotos(response.data));
			//leaving async await for adding to db later;
		} catch (err) {
			console.log(err);
		}
	};
};

// export const deletePhoto = (photo) => {
// 	return async (dispatch) => {
// 		try {
// 			dispatch(removePhoto({ path: photo }));
// 			//leaving async await for adding to db later;
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	};
// };

const photos = [];

export default function photoReducer(state = photos, action) {
	switch (action.type) {
		case GET_PHOTOS:
			return action.arrOfObj;
		// case REMOVE_PHOTOS:
		// 	const removed = state.filter((object) => object.path !== action.path);
		// 	return removed;
		case ADD_PHOTOS:
			return [...state, action.obj];

		default:
			return state;
	}
}
