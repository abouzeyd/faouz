import { createSlice } from '@reduxjs/toolkit';
import { getUtilisateurs, createUtilisateur } from '../../service/parametrage/utilisateurs';

const initialState = {
  utilisateurs: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  valueEdition: '',
  receiveEditId: ''
};

const utilisateurSlice = createSlice({
  name: 'utilisateur',
  initialState,
  reducers: {
    setUtilisateurs: (state, action) => {
      state.utilisateurs = action.payload;
    },
    setReceiveEditId: (state, action) => {
      state.receiveEditId = action.payload;
    },

    setEdition: (state, action) => {
      state.valueEdition = action.payload;
    },
    clearCreateError: (state) => {
      state.createError = null;
    }
  },
  extraReducers: (builder) => {
    // Gestion de getUtilisateurs
    builder.addCase(getUtilisateurs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUtilisateurs.fulfilled, (state, action) => {
      state.utilisateurs = action.payload;
      state.loading = false;
    });
    builder.addCase(getUtilisateurs.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    // Gestion de createUtilisateur
    builder.addCase(createUtilisateur.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
    });
    builder.addCase(createUtilisateur.fulfilled, (state, action) => {
      state.createLoading = false;
      // Optionnel : ajouter le nouvel utilisateur à la liste
      // state.utilisateurs.push(action.payload);
    });
    builder.addCase(createUtilisateur.rejected, (state, action) => {
      state.createError = action.error.message;
      state.createLoading = false;
    });
  }
});

export const { setUtilisateurs, clearCreateError, setEdition, setReceiveEditId } = utilisateurSlice.actions;
export default utilisateurSlice.reducer;
