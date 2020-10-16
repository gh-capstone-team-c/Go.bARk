/** @format */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import LoginAndroid from './js/Login-android';
import store from './store/store';

export default class RootAndroid extends Component {
	render() {
		return (
			<Provider store={store}>
				<LoginAndroid />
			</Provider>
		);
	}
}
