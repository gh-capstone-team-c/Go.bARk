/** @format */

import React, { Component } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { NativeRouter, Route, Switch } from 'react-router-native';
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
