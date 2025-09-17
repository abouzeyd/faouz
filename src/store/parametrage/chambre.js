/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { getChambres, createChambre, getChambre, updateChambre } from '../../service/parametrage/chambres';
import { getEcoles } from '../../service/parametrage/ecole';
import { getProfils } from '../../service/parametrage/listeprofil';

const initialState = {
  chambres: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  valueEdition: '',
  receiveEditId: '',
  chambre: {},
  receiveId: {},
  chambreupdate: [],
  listeEcoles: [],
  listeProfils: []
};

const chambreSlice = createSlice({
  name: 'chambres',
  initialState,
  reducers: {
    setchambre: (state, action) => {
      state.chambres = action.payload;
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
    // Gestion de getChambres
    builder.addCase(getChambres.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getChambres.fulfilled, (state, action) => {
      state.chambres = action.payload;
      state.loading = false;
    });
    builder.addCase(getChambres.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    // Gestion de getChambre
    builder.addCase(getChambre.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getChambre.fulfilled, (state, action) => {
      state.chambre = action.payload;
      state.loading = false;
    });
    builder.addCase(getChambre.rejected, (state, action) => {
      console.log('action', action);

      state.error = action.message;
      state.loading = false;
    });

    // Gestion de createChambre
    builder.addCase(createChambre.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
    });
    builder.addCase(createChambre.fulfilled, (state, action) => {
      state.createLoading = false;
      // Optionnel : ajouter le nouvel utilisateur à la liste
      state.chambres.push(action.payload);
    });
    builder.addCase(createChambre.rejected, (state, action) => {
      state.createError = action.error.message;
      state.createLoading = false;
    });

    builder.addCase(updateChambre.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
    });

    builder.addCase(updateChambre.fulfilled, (state, action) => {
      state.createLoading = false;
      const updated = action.payload;
      state.chambreupdate = state.chambres.map((u) => (u.id === updated.id ? updated : u));
    });

    builder.addCase(updateChambre.rejected, (state, action) => {
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

export const { setChambre, clearCreateError, setEdition, setReceiveEditId, setReceiveId } = chambreSlice.actions;
export default chambreSlice.reducer;
