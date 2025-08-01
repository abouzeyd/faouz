import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { getValueLocalStorage, putInLocalStorage } from '../service/globalFunction';
import { generateMenu } from '../service/auth';
import { useNavigate } from 'react-router-dom';

const ModalProfilPrivilege = ({ open, onOk, onCancel, setReceiveProfilId }) => {
  const dataChild = getValueLocalStorage('dataChild') ?? [];
  const navigate = useNavigate();

  return (
    <>
      <Modal title="Liste des profils" open={open} onOk={onOk} onCancel={onCancel} footer={null} maskClosable={false}>
        {dataChild &&
          dataChild?.map((item) => {
            return (
              <div style={{ width: '410px', marginLeft: 'auto', marginRight: 'auto', marginTop: 50, marginBottom: 50 }}>
                <Button
                  style={{ width: 400, padding: 2 }}
                  onClick={async () => {
                    const responses = await generateMenu(item?.lgProid);

                    putInLocalStorage('generateMenu', responses?.data);
                    setReceiveProfilId(item?.lgProid);
                    if (responses?.data?.length > 0) {
                      navigate('/dashboard');
                      setTimeout(() => {
                        window.location.reload();
                      }, 100);
                    }
                  }}
                  className="btn btn-primary"
                >
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
