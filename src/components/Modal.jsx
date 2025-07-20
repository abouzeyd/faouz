import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, TextField, IconButton, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
// import FormUtilisateur

export default function Modals({ open, handleClose, editerBtn, setEditerBtn }) {
  console.log('teret', editerBtn.length);

  const modalTitle = editerBtn.length === 0 ? 'Créer un utilisateur' : 'Modifier un utilisateur';
  return (
    <div>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box>
          <Box className="modals">
            <DialogTitle className="titleModal">
              {modalTitle}
              <IconButton
                aria-label="close"
                onClick={() => {
                  setEditerBtn('');
                  handleClose();
                }}
                sx={{
                  color: (theme) => theme.palette.grey[50]
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            {/* Exemple d'utilisation de Bootstrap Grid System */}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
