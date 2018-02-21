import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class FloatingButton extends Component {
  render () {
    return (
      <div className='floating-action-button'>
        <i className='material-icons'>{this.props.icon}</i>
      </div>
    );
  }
}

FloatingButton.propTypes = {
  icon: PropTypes.string.isRequired
};

export default FloatingButton;
