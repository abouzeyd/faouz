/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { getEleves, createEleve, getEleve, updateEleve } from '../../service/parametrage/eleves';
import { getListes } from '../../service/parametrage/typeListe';
import { getChambres } from '../../service/parametrage/chambres';

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
  listeEleves: [],
  listeProfils: [],
  listeEcoles: [],
  listNationalite: [],
  listChambres: []
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
      state.listeEleves = action?.payload;
      state.loading = false;
    });
    builder.addCase(getEleves.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    // LISTE DES TYPES LISTES

    // builder.addCase(getTypeListes.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(getTypeListes.fulfilled, (state, action) => {
    //   state.listNationalite = action?.payload;
    //   state.loading = false;
    // });
    // builder.addCase(getTypeListes.rejected, (state, action) => {
    //   state.error = action.error.message;
    //   state.loading = false;
    // });

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
      .addCase(getListes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListes.fulfilled, (state, action) => {
        state.loading = false;

        if (action?.payload.length > 0) {
          let ecole = [];

          action?.payload.forEach((element) => {
            ecole.push({
              label: element?.strLstdescription,
              value: element?.lgLstid
            });
          });
          state.listNationalite = ecole;
        }
      })
      .addCase(getListes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // LISTE CHAMBRES

    builder
      .addCase(getChambres.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChambres.fulfilled, (state, action) => {
        state.loading = false;

        if (action?.payload.length > 0) {
          let chambres = [];

          action?.payload.forEach((chambre) => {
            chambres.push({
              label: chambre?.strChanumbat,
              value: chambre?.lgChaid
            });
          });

          console.log({ chambres });

          state.listChambres = chambres;
        }
      })
      .addCase(getChambres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setEleves, clearCreateError, setEdition, setReceiveEditId, setReceiveId } = elevesSlice.actions;
export default elevesSlice.reducer;
