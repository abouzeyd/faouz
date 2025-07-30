import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, Typography, IconButton, Box, Checkbox } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { getProfils } from '../../../../service/parametrage/listeprofil';
import { ListeProfilUser } from './ListeProfilUser';

export default function ModalProfilUtilisateur({ open, handleClose }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfils());
  }, []);

  const modalTitle = 'Liste des profils';
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
                  handleClose();
                }}
                sx={{
                  color: (theme) => theme.palette.grey[50]
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <ListeProfilUser handleClose={handleClose} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
