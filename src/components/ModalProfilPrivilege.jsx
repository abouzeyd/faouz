import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import FormProfilPrivilege from '../pages/parametrage/profil-privilege/components/FormProfilPrivilege';

export default function Modals({ open, handleClose, editerBtn, setEditerBtn }) {
  const modalTitle = editerBtn.length === 0 ? 'Créer un profil' : 'Modifier un profil';
  return (
    <div>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box>
          <Box className="modalsProfilPrivilege" sx={{ width: 9000 }}>
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
            <Box sx={{ p: 4 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <FormProfilPrivilege />
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
