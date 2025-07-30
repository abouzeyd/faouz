import { createSlice } from '@reduxjs/toolkit';
import { getUtilisateurs, createUtilisateur, getUtilisateur, updateUtilisateur } from '../../service/parametrage/utilisateurs';
import { getEcoles } from '../../service/parametrage/ecole';
import { getProfils } from '../../service/parametrage/listeprofil';

const initialState = {
  utilisateurs: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  valueEdition: '',
  receiveEditId: '',
  utilisateur: {},
  receiveId: {},
  utilisateurupdate: [],
  listeEcoles: [],
  listeProfils: []
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

    // Gestion de getUtilisateur
    builder.addCase(getUtilisateur.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUtilisateur.fulfilled, (state, action) => {
      state.utilisateur = action.payload;
      state.loading = false;
    });
    builder.addCase(getUtilisateur.rejected, (state, action) => {
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
      .addCase(getEcoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEcoles.fulfilled, (state, action) => {
        state.loading = false;

        if (action?.payload.length > 0) {
          let ecole = [];

          action?.payload.forEach((element) => {
            ecole.push({
              label: element?.strEcodescription,
              value: element?.lgEcoid
            });
          });
          state.listeEcoles = ecole;
        }
      })
      .addCase(getEcoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder.addCase(getProfils.fulfilled, (state, action) => {
      state.createLoading = false;
      // Optionnel : ajouter le nouvel utilisateur à la liste
      state.listeProfils = action.payload;
    });
    builder.addCase(getProfils.rejected, (state, action) => {
      state.createError = action.error.message;
      state.createLoading = false;
    });
  }
});

export const { setUtilisateurs, clearCreateError, setEdition, setReceiveEditId, setReceiveId } = utilisateurSlice.actions;
export default utilisateurSlice.reducer;
