/* eslint-disable prettier/prettier */
import React from 'react';
import { setEdition, setReceiveId, setEditeListe } from '../../../../../store/parametrage/typeListe';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getListe } from '../../../../../service/parametrage/typeListe';

export default function RenderActions({ loading, record, setEditerBtn, handleVoir, setDeleteBtn, handleOpenModalDelete }) {
  const dispatch = useDispatch();

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <EditOutlined
          style={{ fontSize: 15, color: 'blue', marginLeft: 2 }}
          onClick={() => {
            dispatch(setReceiveId(record));
            setEditerBtn(record);
            dispatch(getListe(record?.key));
            dispatch(setEditeListe('edition'));
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
