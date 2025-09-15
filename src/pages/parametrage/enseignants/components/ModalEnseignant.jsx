/* eslint-disable prettier/prettier */
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, TextField, IconButton, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import FormEleve from './FormEnseignant';
import { useSelector } from 'react-redux';

export default function Modals({ open, handleClose }) {
  const { valueEdition } = useSelector((state) => state.utilisateur);

  const modalTitle = valueEdition === 'editer' ? 'Modifier un élève' : valueEdition === 'voir' ? 'visualiser' : 'Créer un élève';
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
            <FormEleve handleClose={handleClose} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
