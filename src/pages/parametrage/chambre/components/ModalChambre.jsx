/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, TextField, IconButton, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import FormChambre from './FormChambre';
import { useSelector } from 'react-redux';

export default function Modals({ open, handleClose }) {
  const { valueEdition } = useSelector((state) => state.chambre);

  const modalTitle = valueEdition === 'editer' ? 'Modifier une chambre' : 'Créer une chambre';
  return (
    <div>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box>
          <Box className="modales">
            <DialogTitle className="titleModal">
              {modalTitle}
              <IconButton
                aria-label="close"
                onClick={() => {
                  handleClose();
                }}
                sx={{
                  color: (theme) => theme.palette.grey[50]
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <FormChambre handleClose={handleClose} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
