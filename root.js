/** @format */

import React, { Component } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { NativeRouter, Route, Switch } from 'react-router-native';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';

export default class Root extends Component {
	render() {
		console.log('this is the root');
		return (
			<Provider store={store}>
				<AppIos />
			</Provider>
		);
	}
}
