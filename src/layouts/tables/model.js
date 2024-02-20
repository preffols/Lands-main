// ModalPopup.js
import React from 'react';
import { Modal, Box, Button } from '@mui/material';

const ModalPopup = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 3 }}>
        {/* Your modal content */}
        <h2>Pop-up Modal</h2>
        <p>This is some content inside the modal.</p>
        <Button variant="contained" onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default ModalPopup;
