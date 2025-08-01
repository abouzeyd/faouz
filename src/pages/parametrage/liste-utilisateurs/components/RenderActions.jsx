import React from 'react';
import { setEdition, setReceiveId } from '../../../../store/parametrage/utilisateur';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined, UsergroupAddOutlined } from '@ant-design/icons';

export default function RenderActions({
  loading,
  record,
  setEditerBtn,
  handleOpenModalEditer,
  handleVoir,
  setDeleteBtn,
  handleOpenModalDelete,
  handleOpenModalProfilUser
}) {
  const dispatch = useDispatch();

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <UsergroupAddOutlined
          style={{ fontSize: 15, color: 'green', marginLeft: 2, marginRight: 12 }}
          onClick={() => {
            dispatch(setReceiveId(record));
            setEditerBtn(record);
            handleOpenModalProfilUser(record);
            // dispatch(setEdition('editer'));
          }}
          title="ajouter un profil à l'utilisateur"
        />
        <EditOutlined
          style={{ fontSize: 15, color: 'blue', marginLeft: 2 }}
          onClick={() => {
            dispatch(setReceiveId(record));
            setEditerBtn(record);
            handleOpenModalEditer(record);
            dispatch(setEdition('editer'));
          }}
          title="modification"
        />

        <DeleteOutlined
          style={{ fontSize: 15, color: 'red', marginRight: 12, marginLeft: 10 }}
          onClick={() => {
            setDeleteBtn(record);
            handleOpenModalDelete();
            dispatch(setReceiveId(record));
          }}
          title="supprimer"
        />
      </div>
    </div>
  );
}
