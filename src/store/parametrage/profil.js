/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { getUtilisateurs, createUtilisateur, getUtilisateur, updateUtilisateur } from '../../service/parametrage/utilisateurs';
import { getPisteAudit } from '../../service/parametrage/listeprofil';
import { getProfils, getProfil } from '../../service/parametrage/listeprofil';
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
  listeProfils: [],
  pisteAudit: [],
  receiveChecked: {},
  listePrivilegeId: {},
  receiveCheckedId: []
};

const utilisateurSlice = createSlice({
  name: 'profil',
  initialState,
  reducers: {
    setProfil: (state, action) => {
      state.profil = action.payload;
    },
    setReceiveEditId: (state, action) => {
      state.receiveEditId = action.payload;
    },

    setReceiveCheckedId: (state, action) => {
      state.receiveCheckedId = action.payload;
    },

    setReceiveId: (state, action) => {
      state.receiveId = action.payload;
    },

    setReceiveChecked: (state, action) => {
      state.receiveChecked = action.payload;
    },

    setEdition: (state, action) => {
      state.valueEdition = action.payload;
    },
    clearCreateError: (state) => {
      state.createError = null;
    },
    setListePrivilegeId: (state, action) => {
      state.listePrivilegeId = action.payload;
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
    builder.addCase(getProfil.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProfil.fulfilled, (state, action) => {
      state.profil = action.payload;
      state.loading = false;
    });
    builder.addCase(getProfil.rejected, (state, action) => {
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

    builder
      .addCase(getProfils.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfils.fulfilled, (state, action) => {
        state.loading = false;
        state.listeProfils = action.payload;
        state.receiveChecked = action.payload;
      })
      .addCase(getProfils.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // PISTE AUDITE

    builder
      .addCase(getPisteAudit.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPisteAudit.fulfilled, (state, action) => {
        state.loading = false;
        state.pisteAudit = action.payload;
      })
      .addCase(getPisteAudit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  setUtilisateurs,
  clearCreateError,
  setEdition,
  setReceiveEditId,
  setReceiveId,
  setReceiveChecked,
  setListePrivilegeId,
  setReceiveCheckedId
} = utilisateurSlice.actions;
export default utilisateurSlice.reducer;
