import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import React from 'react';
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onDismiss}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const parentEl = document.getElementById('overlays');

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onDismiss={props.onDismiss} />, parentEl)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, parentEl)}
    </React.Fragment>
  );
};

export default Modal;
