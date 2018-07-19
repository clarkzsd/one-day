import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class Modal extends Component {
  onClose = () => {
    const { onModalClose } = this.props;
    onModalClose && onModalClose();
  }

  render () {
    const { footer, title, onModalClose } = this.props;
    return (
      <div className='modal-wrapper'>
        <div className='modal-mask' />
        <div className='modal'>
          <div className='modal-content'>
            <header className='modal-header'>
              <h4 className='modal-title'>{title}</h4>
              {
                onModalClose &&
                <button className='modal__rightBtn' onClick={this.onClose}>
                  <i className='material-icons'>close</i>
                </button>
              }
            </header>
            <div className='modal-body'>
              {this.props.children}
            </div>
            { footer &&
              <footer className='modal-footer'>
                {footer}
              </footer>
            }
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  footer: PropTypes.node,
  onModalClose: PropTypes.func,
  title: PropTypes.string.isRequired
};

export default Modal;
