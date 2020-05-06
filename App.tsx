import React from "react";
import AppNavigator from './src/navigation';
import { SafeAreaView, StatusBar } from "react-native";
import { useColorScheme } from 'react-native-appearance';

const App = () => {
    const colorScheme = useColorScheme();
    return(
        <>
            <SafeAreaView style={{ flex: 0 }} />
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={colorScheme === 'light' ? 'light-content' : 'dark-content'} />
                <AppNavigator/>
            </SafeAreaView>
        </>
    );
};

export default App;