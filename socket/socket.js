/** @format */

import io from 'socket.io-client';
import store from '../store/store';
import { getUsers } from '../store/allUsers';

const socket = io('https://gobark-backend.herokuapp.com');

socket.on('connect', () => {
	console.log('connected to the server');
});

socket.on('pointsUpdated', () => {
	console.log('frontend: points were updated');
	store.dispatch(getUsers());
});

socket.on('disconnect', () => {
	console.log('disconnected');
});

export default socket;
