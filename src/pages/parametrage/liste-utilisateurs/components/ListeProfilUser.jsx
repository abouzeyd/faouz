import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DialogTitle, Typography, IconButton, Button, Checkbox } from '@mui/material';
import { createProfilUtilisateur } from '../../../../service/parametrage/utilisateurs';

export const ListeProfilUser = ({ handleClose }) => {
  const dispatch = useDispatch();

  const { listeProfils, receiveId } = useSelector((state) => state.utilisateur);

  const [receiveCheckedId, setReceiveCheckedId] = useState([]);

  console.log({ receiveId });

  const handleCheckboxChange = (_, item) => {
    setReceiveCheckedId(
      (prev) =>
        prev.includes(item?.lgProid)
          ? prev.filter((v) => v !== item?.lgProid) // Retirer si déjà présent
          : [...prev, item?.lgProid] // Ajouter sinon
    );
  };

  const handleSaveProfil = () => {
    dispatch(createProfilUtilisateur(receiveCheckedId));
  };

  console.log({ receiveCheckedId });

  return (
    <div>
      {listeProfils?.map((item) => (
        <div style={{ display: 'flex', paddingLeft: 25, marginTop: 20, alignItems: 'center' }}>
          <div style={{ marginRight: 15 }}>
            <Checkbox checked={receiveCheckedId.includes(item.lgProid)} onChange={(e) => handleCheckboxChange(e, item)} />
          </div>
          <div>
            <Typography>{item?.strProname}</Typography>
          </div>
        </div>
      ))}
      <div
        className="style"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: 1,
          //   gap: '10px',
          padding: '15rem',
          borderTop: '1px solid #ccc'
        }}
      >
        <Button variant="contained" sx={{ bgcolor: 'red', mr: 2 }} onClick={handleClose}>
          Annueler
        </Button>
        <Button variant="contained" onClick={handleSaveProfil}>
          Enregister
        </Button>
      </div>
    </div>
  );
};
