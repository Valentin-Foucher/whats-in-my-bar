import { Dialog, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';
import React from 'react';

interface ModalProps {
  open: boolean;
  onClose(): void;
};

 const useStyles = makeStyles({
   paper: {
     position: 'absolute',
     top: '3rem',
     right: '2rem',
     minWidth: '20vw'
   }
 });

export default function ConnectModal({open, onClose}: ModalProps) {

  const classes= useStyles()
  return (
    <Dialog
      maxWidth='md'
      classes={{paper: classes.paper}}
      open={open} onClose={onClose} onExit={onClose}>
      <DialogTitle> Hello !</DialogTitle>
      <DialogContent> Test </DialogContent>
    </Dialog>
  );
};
