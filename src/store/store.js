/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/auth';
import utilisateurReducer from './parametrage/utilisateur';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['authentication']
};

const persistAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
    utilisateur: utilisateurReducer
  }
});

export const persistor = persistStore(store);
