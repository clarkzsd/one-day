import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class FloatingButton extends Component {
  render () {
    const { icon, onPress } = this.props;
    return (
      <div className='floating-action-button' onClick={onPress}>
        {icon}
      </div>
    );
  }
}

FloatingButton.propTypes = {
  icon: PropTypes.object.isRequired,
  onPress: PropTypes.func
};

export default FloatingButton;
