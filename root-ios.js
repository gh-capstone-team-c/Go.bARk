/** @format */

import React, { Component } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { NativeRouter, Route, Switch } from 'react-router-native';
import { Provider } from 'react-redux';
import AppIos from './App-ios';
import store from './store/store';

export default class RootIos extends Component {
	render() {
		console.log('this is the root');
		return (
			<Provider store={store}>
				<AppIos />
			</Provider>
		);
	}
}
