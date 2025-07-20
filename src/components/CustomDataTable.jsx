/* eslint-disable prettier/prettier */
import React, { useState, useMemo } from 'react';
import { Table, Input, Select, Button, Space, Tooltip, Spin, Empty } from 'antd';
import { SearchOutlined, ReloadOutlined, FilterOutlined } from '@ant-design/icons';
import '../styles/parametrage/listeUser.css';

const { Search } = Input;
const { Option } = Select;

const CustomDataTable = ({
  // Données et configuration
  data = [],
  columns = [],
  loading = false,
  error = null,

  // Configuration de la table
  pagination = true,
  pageSize = 10,
  showSizeChanger = true,
  showQuickJumper = true,

  // Fonctions de callback
  onRowClick,
  onSelectionChange,
  onSearch,
  onRefresh,

  // Configuration des actions
  showActions = true,
  actions = [],

  // Configuration de la recherche
  searchable = true,
  searchPlaceholder = 'Rechercher...',

  // Configuration du tri
  sortable = true,

  // Configuration de la sélection
  selectable = false,
  rowSelection = null,

  // Styles personnalisés
  className = '',
  style = {},

  // Configuration des états vides
  emptyText = 'Aucune donnée disponible',
  emptyDescription = 'Aucune donnée à afficher'
}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Configuration de la pagination
  const paginationConfig = pagination
    ? {
        showSizeChanger,
        showQuickJumper,
        showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} éléments`,
        pageSize,
        position: ['bottomCenter']
      }
    : false;

  // Configuration de la sélection de lignes
  const rowSelectionConfig = selectable
    ? {
        selectedRowKeys,
        onChange: (selectedKeys, selectedRows) => {
          setSelectedRowKeys(selectedKeys);
          onSelectionChange?.(selectedKeys, selectedRows);
        },
        ...rowSelection
      }
    : undefined;

  // Fonction de recherche
  const handleSearch = (value) => {
    setSearchText(value);
    if (onSearch) {
      onSearch(value);
    } else {
      // Recherche locale par défaut
      const filtered = data.filter((item) => Object.values(item).some((val) => String(val).toLowerCase().includes(value.toLowerCase())));
      setFilteredData(filtered);
    }
  };

  // Fonction de rafraîchissement
  const handleRefresh = () => {
    setSearchText('');
    setFilteredData(data);
    onRefresh?.();
  };

  // Colonnes avec actions
  const tableColumns = useMemo(() => {
    const baseColumns = columns.map((col) => ({
      ...col,
      onHeaderCell: () => ({
        style: {
          background: '#f0f0f0',
          color: 'black',
          fontWeight: 'bold'
        }
      })
    }));

    if (showActions && actions.length > 0) {
      baseColumns.push({
        title: 'Actions',
        key: 'actions',
        fixed: 'right',
        width: 120,
        onHeaderCell: () => ({
          style: {
            background: '#f0f0f0',
            color: 'black',
            fontWeight: 'bold'
          }
        }),
        render: (_, record) => (
          <Space size="small">
            {actions.map((action, index) => (
              <Tooltip key={index} title={action.tooltip || action.label}>
                <Button
                  type={action.type || 'default'}
                  size="small"
                  icon={action.icon}
                  onClick={() => action.onClick(record)}
                  disabled={action.disabled?.(record)}
                >
                  {action.label}
                </Button>
              </Tooltip>
            ))}
          </Space>
        )
      });
    }

    return baseColumns;
  }, [columns, showActions, actions]);

  // Gestion des erreurs
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ color: '#ff4d4f', marginBottom: '16px' }}>Une erreur s'est produite lors du chargement des données</div>
        <Button type="primary" onClick={handleRefresh}>
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className={`custom-data-table ${className}`} style={style}>
      {/* Barre d'outils */}
      {(searchable || onRefresh) && (
        <div
          style={{
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0'
          }}
        >
          <Space>
            {searchable && (
              <Search
                placeholder={searchPlaceholder}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={handleSearch}
                style={{ width: 250 }}
                allowClear
              />
            )}
          </Space>

          {onRefresh && (
            <Button icon={<ReloadOutlined />} onClick={handleRefresh} loading={loading}>
              Actualiser
            </Button>
          )}
        </div>
      )}

      {/* Table */}
      <Table
        columns={tableColumns}
        dataSource={onSearch ? data : filteredData}
        loading={loading}
        pagination={paginationConfig}
        rowSelection={rowSelectionConfig}
        onChange={(pagination, filters, sorter) => {
          console.log('Table change:', { pagination, filters, sorter });
        }}
        onRow={
          onRowClick
            ? (record) => ({
                onClick: () => onRowClick(record)
              })
            : undefined
        }
        rowKey={(record) => record.id || record.key || Math.random()}
        locale={{
          emptyText: <Empty description={emptyDescription} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }}
        scroll={{ x: 'max-content' }}
        size="middle"
      />
    </div>
  );
};

export default CustomDataTable;
