import React, { Component } from 'react';
import Modal from '../UI/Modal';
import PropTypes from 'prop-types';
import './style.scss';

class AboutModal extends Component {
  render () {
    return (
      <div className='about-modal'>
        <Modal
          title='关于'
          footer={
            <button onClick={this.props.handleCancel}>关闭</button>
          }
        >
          <p>One Day is GTD application in Material Design.</p>
          <p className='author-info' align='right'>By <a href='http://sytone.me'>Sytone</a></p>
        </Modal>
      </div>
    );
  }
}

AboutModal.propTypes = {
  handleCancel: PropTypes.func.isRequired
};

export default AboutModal;
