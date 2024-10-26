import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import authReducer from './slice/AuthSlice';
import productsReducer from './slice/ProductSlice';

const persistConfig = {
    key: 'root',
    storage: storageSession,
};

const rootReducer = combineReducers({
    authReducer,
    productsReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
