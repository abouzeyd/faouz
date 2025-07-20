import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1
};

/**
 * @typedef {Object} ModalsProps
 * @property {boolean} open
 * @property {() => void} handleClose
 * @property {() => void} deleteButton
 */

/**
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.handleClose
 * @param {() => void} props.deleteButton
 */
export default function DoyouWantDelete({ open, handleClose, deleteButton, deleteBtn }) {
  return (
    <div>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box>
          <Box sx={style}>
            <DialogTitle
              sx={{
                m: 0,
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: 'black',
                color: 'white'
              }}
            >
              Supprimer un élément
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  color: (theme) => theme.palette.grey[50]
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <Box sx={{ p: 4 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Vouliez-vous vraiment supprimer l'utilisateur {deleteBtn.nom} ?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, p: 2 }}>
              <Button variant="contained" onClick={handleClose}>
                Annuler
              </Button>
              <Button variant="contained" sx={{ bgcolor: 'red' }} onClick={deleteButton}>
                Supprimer
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
