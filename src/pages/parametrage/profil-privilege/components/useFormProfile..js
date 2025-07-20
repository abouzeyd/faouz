import { useState } from 'react';

export function useFomProfil() {
  const [name, setName] = useState('');
  const [receiveCheckedId, setReceiveCheckedId] = useState([]);
  const [description, setDescription] = useState('');
  const [privilege, setPrivilege] = useState(null);
  const [page, setPage] = useState(1);

  const options = [
    { label: 'Métier', value: '1' },
    { label: 'Système', value: '2' }
  ];

  const valueChecked = [
    { label: 'label1', value: 1 },
    { label: 'label2', value: 2 },
    { label: 'label3', value: 3 },
    { label: 'label4', value: 4 },
    { label: 'label5', value: 5 },
    { label: 'label6', value: 6 },
    { label: 'label7', value: 7 },
    { label: 'label8', value: 8 },
    { label: 'label9', value: 9 },
    { label: 'label10', value: 10 },
    { label: 'label11', value: 11 },
    { label: 'label12', value: 12 }
  ];

  const itermsPerPage = 5;
  const totalPages = Math.ceil(valueChecked.length / itermsPerPage);

  const paginatedItems = valueChecked.slice((page - 1) * itermsPerPage, page * itermsPerPage);

  return {
    setPage,
    options,
    privilege,
    setPrivilege,
    name,
    setName,
    description,
    setDescription,
    paginatedItems,
    totalPages,
    page,
    itermsPerPage,
    setReceiveCheckedId,
    receiveCheckedId
  };
}
