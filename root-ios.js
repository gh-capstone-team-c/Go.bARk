/** @format */

import React, { Component } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { NativeRouter, Route, Switch } from 'react-router-native';
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
