/* eslint-disable prettier/prettier */
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, TextField, IconButton, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import FormTypeListe from './FormTypeListe';
import { useSelector } from 'react-redux';
import { setEditeListe } from '../../../../store/parametrage/typeListe';
import { useDispatch } from 'react-redux';

export default function Modals({ open, handleClose }) {
  const { valueEdition, typeListe } = useSelector((state) => state.TypeListe);
  const dispatch = useDispatch();

  const modalTitle =
    valueEdition === 'editer' ? 'Modifier une type liste' : valueEdition === 'voir' ? 'visualiser' : 'Créer une type liste';

  console.log({ typeListe });

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
                  dispatch(setEditeListe(''));
                }}
                sx={{
                  color: (theme) => theme.palette.grey[50]
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <FormTypeListe handleClose={handleClose} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
