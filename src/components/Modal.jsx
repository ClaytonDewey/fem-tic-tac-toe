import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
  const { title, content, actions, onDismiss, isOpen } = props;

  useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }
    document.addEventListener('keydown', keyListener);

    return () => document.removeEventListener('keydown', keyListener);
  });

  const modalRef = React.createRef();
  const handleTabKey = (e) => {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );

    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus();
      e.preventDefault();
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  const keyListenersMap = new Map([
    [27, onDismiss],
    [9, handleTabKey],
  ]);

  return ReactDOM.createPortal(
    <div
      onClick={onDismiss}
      className={`modal modal__bg ${isOpen ? '' : 'visible'}`}
      aria-hidden={isOpen}
      aria-labelledby='heading'
      aria-describedby='content'
      role='dialog'
      aria-modal='true'
      ref={modalRef}>
      <div
        id='heading'
        onClick={(e) => e.stopPropagation()}
        className='modal__body'>
        <div className='modal__header'>
          <h2>{title}</h2>
        </div>
        <div id='content' className='modal__content'>
          {content}
        </div>
        <div className='modal__actions'>{actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
