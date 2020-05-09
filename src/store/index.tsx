import { createStore } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from '../reducers';

// persist config is how the app checks whether there is a cached version of the state available in AsyncStore
// if you want the app to abandon the cached state and start fresh, change the key from 'root' to 'root1' for ex.
const persistConfig = {
  key: 'root5',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);