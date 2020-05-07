import React from "react";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './src/store';
import AppNavigator from './src/navigation';
import { SafeAreaView, StatusBar } from "react-native";
import { useColorScheme } from 'react-native-appearance';

const App = () => {
    const colorScheme = useColorScheme();
    return(
        <>
            <SafeAreaView style={{ flex: 0 }} />
            <SafeAreaView style={{ flex: 1 }}>
                { /* Provider makes it so the store is accessible to all child components */ }
                <Provider store={store}>
                    {/* Persistor helps app state persist when the app is closed */}
                    <PersistGate persistor={persistor}>
                        <StatusBar barStyle={colorScheme === 'light' ? 'light-content' : 'dark-content'} />
                        <AppNavigator/>
                    </PersistGate>
                </Provider>
            </SafeAreaView>
        </>
    );
};

export default App;