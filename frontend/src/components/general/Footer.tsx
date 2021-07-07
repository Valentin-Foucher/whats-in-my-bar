import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import colors from '../../styles/colors';
import { Modal } from '@material-ui/core';
import Contact from './Contact';
import About from './About';
import SupportUs from './SupportUs';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '6vh',
    backgroundColor: colors.primary
  },
  leftItem: {
    background: colors.leftFooterGradient,
    fontWeight: 700,
    fontSize: 20
  },
  centerItem: {
    backgroundColor: colors.secondary,
    fontWeight: 700,
    fontSize: 20
  },
  rightItem: {
    background: colors.rightFooterGradient,
    fontWeight: 700,
    fontSize: 20
  },
  modal: {
    position: 'absolute',
    width: '80vh',
    backgroundColor: 'white',
    boxShadow: '0px 0px 0px 2px #000',
    padding: '5px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '5px',
    outline: 'none'
  }
});

export default function Footer() {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);
  const [footerMode, setFooterMode] = React.useState('');

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickAbout = () => {
    setFooterMode('about');
    setOpenModal(true);
  };

  const handleClickContact = () => {
    setFooterMode('contact');
    setOpenModal(true);
  };

  const handleClickSupportUs = () => {
    setFooterMode('support');
    setOpenModal(true);
  };

  return (
    <BottomNavigation
      showLabels
      className={classes.root}
    >
    <BottomNavigationAction className={classes.leftItem} label="Contact" onClick={handleClickContact} />
    <BottomNavigationAction className={classes.centerItem} label="About" onClick={handleClickAbout} />
    <BottomNavigationAction className={classes.rightItem} label="Support us" onClick={handleClickSupportUs} />
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="footer-modal"
      aria-describedby="personal-modal"
    >
      <div className={classes.modal}>
        {
        footerMode === 'contact' ? <Contact /> :
        footerMode === 'about' ? <About /> :
        <SupportUs />
        }
      </div>
    </Modal>
  </BottomNavigation>
  );
}

