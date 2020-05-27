import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import { fetchCharts } from '../actions/index';

import rootReducer from '../reducers';
import thunk from 'redux-thunk';

// persist config is how the app checks whether there is a cached version of the state available in AsyncStore
// if you want the app to abandon the cached state and start fresh, change the key from 'root' to 'root1' for ex.
const persistConfig = {
  key: 'root15',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
export const persistor = persistStore(store);