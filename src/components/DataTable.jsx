/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Table } from 'antd';
import '../styles/parametrage/listeUser.css';

export default function DataTable({ data, loading, error, onRefresh, columns }) {
  const [valueChecked, setValueChecked] = useState([]);

  const checkBox = {
    valueChecked,
    onChange: (firstChecked) => {
      setValueChecked(firstChecked);
    }
  };

  console.log({ valueChecked });

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
          rowSelection={checkBox}
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
          rowSelection={checkBox}
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
    </div>
  );
}
