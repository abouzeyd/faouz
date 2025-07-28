import { createSlice } from '@reduxjs/toolkit';
import { getUtilisateurs, createUtilisateur, getUtilisateur, updateUtilisateur } from '../../service/parametrage/utilisateurs';
import { getPrivileges } from '../../service/parametrage/privilege';
import { Label } from '@mui/icons-material';
// import { Label } from '@mui/icons-material';

const initialState = {
  utilisateurs: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  valueEdition: '',
  receiveEditId: '',
  profil: {},
  receiveId: {},
  utilisateurupdate: [],
  listePrivileges: []
};

const privilegeSlice = createSlice({
  name: 'privilege',
  initialState,
  reducers: {
    setProfil: (state, action) => {
      state.profil = action.payload;
    },
    setReceiveEditId: (state, action) => {
      state.receiveEditId = action.payload;
    },

    setReceiveId: (state, action) => {
      state.receiveId = action.payload;
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

    builder
      .addCase(getPrivileges.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPrivileges.fulfilled, (state, action) => {
        state.loading = false;
        state.listePrivileges = action.payload;
      })
      .addCase(getPrivileges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setUtilisateurs, clearCreateError, setEdition, setReceiveEditId, setReceiveId } = privilegeSlice.actions;
export default privilegeSlice.reducer;
