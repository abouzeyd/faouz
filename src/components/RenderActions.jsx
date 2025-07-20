import React from 'react';
import { setEdition } from '../store/parametrage/utilisateur';
import { useDispatch } from 'react-redux';

export default function RenderActions({
  loading,
  record,
  setEditerBtn,
  handleOpenModalEditer,
  handleVoir,
  setDeleteBtn,
  handleOpenModalDelete
}) {
  const dispatch = useDispatch();
  return (
    <div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          className="btn-editer"
          onClick={() => {
            setEditerBtn(record);
            handleOpenModalEditer(record);
          }}
          disabled={loading}
        >
          Éditer
        </button>
        <button
          className="btn-voir"
          onClick={() => {
            handleVoir(record);
            handleOpenModalEditer();
            dispatch(setEdition('voir'));
          }}
          disabled={loading}
        >
          Voir
        </button>
        <button
          className="btn-delete"
          onClick={() => {
            setDeleteBtn(record);
            handleOpenModalDelete();
          }}
          disabled={loading}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
