import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';

export const InfoModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        style={{
          padding: '1rem'
        }}
      >
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          More info
        </button>
      </div>
      <Dialog
        open={open}
        fullWidth
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>More info</DialogTitle>
        <DialogContent>
          Micro-frontends are a design pattern where a single application is divided into multiple
          smaller, loosely coupled, and independently deployable frontend applications.
        </DialogContent>
      </Dialog>
    </>
  );
};
