/** @format */

import axios from 'axios';

const GET_PHOTOS = 'GET_PHOTOS';
const REMOVE_PHOTOS = 'REMOVE_PHOTOS';
const ADD_PHOTOS = 'ADD_PHOTOS';

const getPhotos = (photos) => ({ type: GET_PHOTOS, photos });
const addPhotos = (photo) => ({ type: ADD_PHOTOS, photo });
const removePhoto = (photo) => ({ type: REMOVE_PHOTOS, photo });

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
			console.log('photo redux', photo);
			await axios.post(`https://gobark-backend.herokuapp.com/auth/me/photo`, {
				path: photo,
			});
			dispatch(addPhotos({ path: photo }));
			//leaving async await for adding to db later;
		} catch (err) {
			console.log(err);
		}
	};
};

export const deletePhoto = (photo) => {
	return async (dispatch) => {
		try {
			dispatch(removePhoto(photo));
			//leaving async await for adding to db later;
		} catch (err) {
			console.log(err);
		}
	};
};

const photos = [];

export default function photoReducer(state = photos, action) {
	switch (action.type) {
		case GET_PHOTOS:
			return action.photos;
		case REMOVE_PHOTOS:
			const removed = state.filter((obj) => obj.path !== action.path);
			return removed;
		case ADD_PHOTOS:
			return [...state, action.photo];
		default:
			return state;
	}
}
