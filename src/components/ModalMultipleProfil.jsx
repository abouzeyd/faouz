import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { getValueLocalStorage } from '../service/globalFunction';

const ModalProfilPrivilege = ({ open, onOk, onCancel, setReceiveProfilId }) => {
  const dataChild = getValueLocalStorage('dataChild');

  return (
    <>
      <Modal title="Liste des profils" open={open} onOk={onOk} onCancel={onCancel} footer={null} maskClosable={false}>
        {dataChild?.map((item) => {
          return (
            <div style={{ width: '410px', marginLeft: 'auto', marginRight: 'auto', marginTop: 50, marginBottom: 50 }}>
              <Button style={{ width: 400, padding: 2 }} onClick={() => setReceiveProfilId(item?.lgProid)} className="btn btn-primary">
                {item?.strProname}
              </Button>
            </div>
          );
        })}
      </Modal>
    </>
  );
};

export default ModalProfilPrivilege;
