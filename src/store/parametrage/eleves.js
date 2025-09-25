/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { getEleves, createEleve, getEleve, updateEleve } from '../../service/parametrage/eleves';
import { getEcoles } from '../../service/parametrage/ecole';
import { getProfils } from '../../service/parametrage/listeprofil';

const initialState = {
  eleves: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  valueEdition: '',
  receiveEditId: '',
  eleve: {},
  receiveId: {},
  eleveupdate: [],
  listeEcoles: [],
  listeProfils: []
};

const elevesSlice = createSlice({
  name: 'eleves',
  initialState,
  reducers: {
    setEleves: (state, action) => {
      state.eleves = action.payload;
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
    // Gestion de getEleves
    builder.addCase(getEleves.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getEleves.fulfilled, (state, action) => {
      state.eleves = action.payload;
      state.loading = false;
    });
    builder.addCase(getEleves.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    // Gestion de getEleve
    builder.addCase(getEleve.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getEleve.fulfilled, (state, action) => {
      state.eleve = action.payload;
      state.loading = false;
    });
    builder.addCase(getEleve.rejected, (state, action) => {
      console.log('action', action);

      state.error = action.message;
      state.loading = false;
    });

    // Gestion de createEleve
    builder.addCase(createEleve.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
    });
    builder.addCase(createEleve.fulfilled, (state, action) => {
      state.createLoading = false;
      // Optionnel : ajouter le nouvel utilisateur à la liste
      state.eleves.push(action.payload);
    });
    builder.addCase(createEleve.rejected, (state, action) => {
      state.createError = action.error.message;
      state.createLoading = false;
    });

    builder.addCase(updateEleve.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
    });

    builder.addCase(updateEleve.fulfilled, (state, action) => {
      state.createLoading = false;
      const updated = action.payload;
      state.eleveupdate = state.eleves.map((u) => (u.id === updated.id ? updated : u));
    });

    builder.addCase(updateEleve.rejected, (state, action) => {
      state.createError = action.error.message;
      state.createLoading = false;
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
  }
});

export const { setEleves, clearCreateError, setEdition, setReceiveEditId, setReceiveId } = elevesSlice.actions;
export default elevesSlice.reducer;
