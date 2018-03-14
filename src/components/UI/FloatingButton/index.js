import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class FloatingButton extends Component {
  render () {
    const { icon, onPress } = this.props;
    return (
      <div className='floating-action-button' onClick={onPress}>
        <i className='material-icons'>{icon}</i>
      </div>
    );
  }
}

FloatingButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

export default FloatingButton;
