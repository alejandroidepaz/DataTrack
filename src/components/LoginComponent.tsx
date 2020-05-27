import {
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView, 
    AsyncStorage, Image} from "react-native";
import { Button } from 'react-native-elements';

import {config} from '../login'
import React, { useEffect, useState } from 'react';
import * as Google from 'expo-google-app-auth';
  
  
const LOGO = require('../../assets/datatrack_logo.png');

const Login = ({navigation, fetchCharts}) => {

    // Present Google login form and attempt to retrieve valid user data
    const signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync(config);

            if (result.type === "success") {
                console.log("Login Successful For: ", result.user.givenName);
                /// Fetch the charts for the user from mongoDB
                fetchCharts(result.user.email);
                navigation.navigate("Home", {
                    username: result.user.email,
                    name: result.user.givenName,
                    accessToken: result.accessToken
                }); 
                //after Google login redirect to Home
                return result.accessToken;

            } else {
                
                return { cancelled: true };
            }
        } catch (e) {
            console.log('LoginScreen.js.js 30 | Error with login', e);
            return { error: true };
        }
    };

    return (
    <ScrollView style={styles.container}>
        <View>
            <Image
            accessibilityLabel="App Logo"
            source={LOGO}
            resizeMode="contain"
            style={styles.logo}
            />
        </View>
        <Text style={styles.text}>Please Sign In</Text>
        <Button 
            style={styles.button}
            title="Sign In with Google "
            onPress={signInWithGoogleAsync}
        />
    </ScrollView>
    );
}
    
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff'
    },
    logo: {
        height: 200,
        alignSelf: "center"
    },
    text: {
        fontSize: 25,
        marginVertical: 1,
        textAlign: "center"
    },
    button: {
        margin: 10
    }
});
    
    
  
export default Login;