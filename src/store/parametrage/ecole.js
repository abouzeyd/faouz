import { createSlice } from '@reduxjs/toolkit';
import { getUtilisateurs, createUtilisateur, getUtilisateur, updateUtilisateur } from '../../service/parametrage/utilisateurs';
import { getEcoles, getEcole } from '../../service/parametrage/ecole';
import { Label } from '@mui/icons-material';
// import { Label } from '@mui/icons-material';

const initialState = {
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  valueEdition: '',
  receiveEditId: '',
  ecole: {},
  receiveId: {},
  utilisateurupdate: [],
  listeEcoles: []
};

const ecoleSlice = createSlice({
  name: 'ecoles',
  initialState,
  reducers: {
    setReceiveId: (state, action) => {
      state.receiveId = action.payload;
    },
    setEdition: (state, action) => {
      state.valueEdition = action.payload;
    },
    setReceiveEditId: (state, action) => {
      state.receiveEditId = action.payload;
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

    // Gestion de getUtilisateur
    builder.addCase(getEcoles.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getEcoles.fulfilled, (state, action) => {
      state.listeEcoles = action.payload;
      state.loading = false;
    });
    builder.addCase(getEcoles.rejected, (state, action) => {
      console.log('action', action);

      state.error = action.message;
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
      state.utilisateurs.push(action.payload);
    });
    builder.addCase(createUtilisateur.rejected, (state, action) => {
      state.createError = action.error.message;
      state.createLoading = false;
    });

    builder.addCase(updateUtilisateur.fulfilled, (state, action) => {
      const updated = action.payload;
      state.utilisateurupdate = state.utilisateurs.map((u) => (u.id === updated.id ? updated : u));
    });

    builder.addCase(getEcole.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getEcole.fulfilled, (state, action) => {
      state.ecole = action.payload;
      state.loading = false;
    });
    builder.addCase(getEcole.rejected, (state, action) => {
      console.log('action', action);

      state.error = action.message;
      state.loading = false;
    });
  }
});

export const { setUtilisateurs, clearCreateError, setEdition, setReceiveEditId, setReceiveId } = ecoleSlice.actions;
export default ecoleSlice.reducer;
