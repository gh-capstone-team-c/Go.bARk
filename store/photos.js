/** @format */

import axios from 'axios';

const GET_PHOTOS = 'GET_PHOTOS';
const REMOVE_PHOTOS = 'REMOVE_PHOTOS';
const ADD_PHOTOS = 'ADD_PHOTOS';

const getPhotos = () => ({ type: GET_PHOTOS });
const addPhotos = (photo) => ({ type: ADD_PHOTOS, photo });
const removePhoto = (photo) => ({ type: REMOVE_PHOTOS, photo });

//add points
export const addPhoto = (photo) => {
	return async (dispatch) => {
		try {
			dispatch(addPhotos(photo));
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
			return state;
		case REMOVE_PHOTOS:
			const removed = state.filter((photo) => photo !== action.photo);
			return removed;
		case ADD_PHOTOS:
			return [...state, action.photo];
		default:
			return state;
	}
}
