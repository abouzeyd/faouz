/* eslint-disable prettier/prettier */
import React from 'react';
import { Table } from 'antd';
import '../styles/parametrage/listeUser.css';

export default function DataTable({ data, loading, error, onRefresh, columns }) {
  //

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  // Gestion de l'erreur
  if (error) {
    return (
      <div
        style={{
          position: 'relative',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #f0f0f0'
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          rowSelection={true}
          className="dataTable"
          loading={loading}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} éléments`,
            pageSize: 10,
            position: ['bottomCenter']
          }}
          scroll={{ x: 'max-content' }}
          size="middle"
        />
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Barre d'outils avec bouton de rafraîchissement */}
      {/* {onRefresh && (
        <div
          style={{
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button icon={<ReloadOutlined />} onClick={onRefresh} loading={loading} type="default">
            Actualiser
          </Button>
        </div>
      )} */}

      <div
        style={{
          position: 'relative',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #f0f0f0'
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          rowSelection={true}
          className="dataTable"
          // loading={loading}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} éléments`,
            pageSize: 10,
            position: ['bottomCenter']
          }}
          scroll={{ x: 'max-content' }}
          size="middle"
        />
      </div>
    </div>
  );
}
