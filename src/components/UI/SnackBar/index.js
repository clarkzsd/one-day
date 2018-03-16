import React, { Component } from 'react';
import { connect } from 'react-redux';
import { unTriggerSnackBar } from '../../../actions/ui';
import PropTypes from 'prop-types';

import './style.scss';

class SnackBar extends Component {
  render () {
    const { message, isTriggered } = this.props;
    return (
      <div className={`snack-bar${isTriggered ? ' snack-bar-popup' : ''}`}>
        <div className='inner'>
          <span className='snack-message'>{message}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isTriggered: state.snackBar.isTriggered,
    message: state.snackBar.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    unTriggerSnackBar: () => dispatch(unTriggerSnackBar())
  };
};

SnackBar.propTypes = {
  message: PropTypes.string.isRequired,
  isTriggered: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);
