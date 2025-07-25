import React from 'react';
import { setEdition, setReceiveId } from '../store/parametrage/ecole';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

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
        <EditOutlined
          style={{ fontSize: 15, color: 'blue', marginLeft: 52 }}
          onClick={() => {
            dispatch(setReceiveId(record));
            setEditerBtn(record);
            handleOpenModalEditer(record);
            dispatch(setEdition('editer'));
          }}
          title="modification"
        />

        <DeleteOutlined
          style={{ fontSize: 15, color: 'red', marginLeft: 52 }}
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
