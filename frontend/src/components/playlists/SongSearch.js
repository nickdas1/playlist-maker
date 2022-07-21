import ReactDOM from "react-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SongSearch({ title, content, done, onDismiss }) {
  return ReactDOM.createPortal(
    <div>
      <Modal
        open
        onClick={onDismiss}
      >
        <Box sx={style}  onClick={(e) => e.stopPropagation()}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
            {content}
            <div style={{background: "black"}}>{done}</div>
        </Box>
      </Modal>
    </div>,
    document.querySelector("#songSearch")
  );
}