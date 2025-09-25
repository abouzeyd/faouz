/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { getTypeListes, createTypeListe, updateTypeListe, getTypeliste, getListes, getListe } from '../../service/parametrage/typeListe';
// import { getTypeListes } from '../../service/parametrage/typeListe';
import { Label } from '@mui/icons-material';
// import { Label } from '@mui/icons-material';

const initialState = {
  typeListes: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  valueEdition: '',
  receiveEditId: '',
  profil: {},
  receiveId: {},
  typeListesupdate: [],
  listes: [],
  typeListe: {},
  listes: [],
  editeListe: '',
  liste: {}
};

const typeListeSlice = createSlice({
  name: 'typeListes',
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

    setEditeListe: (state, action) => {
      state.editeListe = action.payload;
    },
    clearCreateError: (state) => {
      state.createError = null;
    }
  },
  extraReducers: (builder) => {
    // Gestion de getTypeListes
    builder.addCase(getTypeListes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTypeListes.fulfilled, (state, action) => {
      state.typeListes = action.payload;
      state.loading = false;
    });
    builder.addCase(getTypeListes.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    builder.addCase(getTypeliste.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTypeliste.fulfilled, (state, action) => {
      state.typeListe = action.payload;
      state.loading = false;
    });
    builder.addCase(getTypeliste.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    // Gestion de createTypeListe
    builder.addCase(createTypeListe.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
    });
    builder.addCase(createTypeListe.fulfilled, (state, action) => {
      state.createLoading = false;
      // Optionnel : ajouter le nouvel utilisateur à la liste
      state.typeListes.push(action.payload);
    });
    builder.addCase(createTypeListe.rejected, (state, action) => {
      state.createError = action.error.message;
      state.createLoading = false;
    });

    builder.addCase(updateTypeListe.fulfilled, (state, action) => {
      const updated = action.payload;
      state.typeListesupdate = state.typeListes.map((u) => (u.id === updated.id ? updated : u));
    });

    // Gestion de createListe

    builder
      .addCase(getListes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListes.fulfilled, (state, action) => {
        state.loading = false;
        state.listes = action.payload;
      })
      .addCase(getListes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getListe.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListe.fulfilled, (state, action) => {
        state.loading = false;
        state.liste = action.payload;
      })
      .addCase(getListe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setUtilisateurs, clearCreateError, setEdition, setReceiveEditId, setReceiveId, setEditeListe } = typeListeSlice.actions;
export default typeListeSlice.reducer;
