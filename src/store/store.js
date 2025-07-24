/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/auth';
import utilisateurReducer from './parametrage/utilisateur';
import ecoleReducer from './parametrage/ecole';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['authentication']
};

const persistAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
    utilisateur: utilisateurReducer,
    ecole: ecoleReducer
  }
});

export const persistor = persistStore(store);
