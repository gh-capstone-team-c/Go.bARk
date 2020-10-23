/** @format */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import LoginIos from './js/Login-ios';
import store from './store/store';

export default class RootIos extends Component {
	render() {
		return (
			<Provider store={store}>
				<LoginIos />
			</Provider>
		);
	}
}
