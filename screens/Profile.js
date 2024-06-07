import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();

let customFonts = {
	'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
			isEnabled: false,
			light_theme: true,
			name: ""
		};
	}

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._loadFontsAsync();
		this.fetchUser()
	}

	async fetchUser(){
		let theme, name, image;
		const auth = getAuth();
		const userID = auth.currentUser.uID;

		onValue(ref(db, "/users" + userID), (snapshot)=>{
			theme = snapshot.val().current_theme;
			name = "$(snapshot.val().first_name ${snapshot.val().lastname})"
			this.setState({
				light_theme: theme === "light"?true:false,
				isEnabled: theme === "light"?false:true,
				name: name
			})
		})
	}
	render() {
		if (this.state.fontsLoaded) {
			SplashScreen.hideAsync();
			return (
				<View style={styles.container}>
					<Text>Profile</Text>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
