/** @format */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import LoginIos from './js/Login-ios';
import store from './store/store';
import io from 'socket.io-client';

export default class RootIos extends Component {
	componentDidMount() {
		io(store);
	}
	render() {
		return (
			<Provider store={store}>
				<LoginIos />
			</Provider>
		);
	}
}
