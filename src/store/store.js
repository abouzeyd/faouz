/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/auth';
import utilisateurReducer from './parametrage/utilisateur';
import ecoleReducer from './parametrage/ecole';
import profilReducer from './parametrage/profil';
import privilegeReducer from './parametrage/privilege';
import chambreReducer from './parametrage/chambre';
import eleveReducer from './parametrage/eleves';
import TypeListeReducer from './parametrage/typeListe';

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
    ecole: ecoleReducer,
    profil: profilReducer,
    privilege: privilegeReducer,
    chambre: chambreReducer,
    eleve: eleveReducer,
    TypeListe: TypeListeReducer
  }
});

export const persistor = persistStore(store);
