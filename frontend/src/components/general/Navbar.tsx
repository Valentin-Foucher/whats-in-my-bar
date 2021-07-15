import {
  AppBar,
  makeStyles,
  SvgIconTypeMap,
  Toolbar,
  Typography
} from '@material-ui/core';
import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Signup from './Signup';
import Signin from './Signin';


const useStyles = makeStyles({
  navMenu: {
    cursor: 'pointer',
    display: 'flex'
  },
  toolbar: {
    minHeight: '7vh',
    justifyContent: 'space-between'
  },
  navItem: {
    display: 'flex'
  },
  title: {
    marginRight: '70px'
  },
  leftNavText: {
    marginRight: '20px'
  },
  rightNavText: {
    marginLeft: '5px'
  },
  leftNavIcon: {
    marginRight: '5px'
  },
  rightNavIcon: {
    marginLeft: '20px'
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


function BarItem(props: { title: string, side: string, Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>, onClick?: () => void }) {
  const classes = useStyles();
  return (
    <div className={classes.navItem} onClick={props.onClick}>
      <props.Icon className={props.side === 'right' ? classes.rightNavIcon : classes.leftNavIcon} />
      <Typography className={props.side === 'right' ? classes.rightNavText : classes.leftNavText}>
        {props.title}
      </Typography>
    </div>
  )
}


export default function Navbar() {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);
  const [signinMode, setSigninMode] = React.useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickSignup = () => {
    setSigninMode(false);
    setOpenModal(true);
  };

  const handleClickSignin = () => {
    setSigninMode(true);
    setOpenModal(true);
  };


  return (
  <AppBar position="static">
    <Toolbar className={classes.toolbar}>
      <div className={classes.navMenu}>
        <Link to='/'>
          <Typography className={classes.title}>
            What's in my bar ?
          </Typography>
        </Link>
        <Link to='/articles'>
          <BarItem title='Articles' side='left' Icon={AssignmentIcon} />
        </Link>
        <Link to='/bar'>
          <BarItem title='My bar' side='left' Icon={LocalBarIcon} />
        </Link>
      </div>
      <div className={classes.navMenu}>
        <BarItem title='Sign up' side='right' Icon={AddIcon} onClick={handleClickSignup}/>
        <BarItem title='Sign in' side='right' Icon={AccountCircleIcon} onClick={handleClickSignin}/>
      </div>
    </Toolbar>
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="sign-modal"
      aria-describedby="sign-form-modal"
    >
      <div className={classes.modal}>
        {signinMode ? <Signin /> : <Signup />}
      </div>
    </Modal>
  </AppBar>
  );
}
