/* eslint-disable prettier/prettier */
import React from 'react';
import { setEdition, setReceiveId } from '../../../../store/parametrage/chambre';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { getProfils } from '../../../../service/parametrage/listeprofil';
import { setReceiveChecked } from '../../../../store/parametrage/profil';

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
