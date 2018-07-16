import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './style.scss';

class SnackBar extends Component {
  static propTypes = {
    action: PropTypes.object,
    duration: PropTypes.number,
    onButtonClick: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
  }

  static defaultProps = {
    duration: 3.5
  }

  componentDidMount () {
    if (this.props.isOpen) {
      this.startCloseTimer();
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      if (this.props.isOpen) {
        this.startCloseTimer();
      }
    }
    if (this.props.duration !== prevProps.duration) {
      this.restartCloseTimer();
    }
  }

  close = () => {
    this.clearCloseTimer();
    this.props.onClose();
  }

  startCloseTimer = () => {
    if (this.props.duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, this.props.duration * 1000);
    }
  }

  clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  restartCloseTimer () {
    this.clearCloseTimer();
    this.startCloseTimer();
  }

  render () {
    const { message, isOpen, action, onButtonClick } = this.props;
    return (
      <CSSTransition
        in={isOpen}
        classNames='snackbar'
        timeout={500}
        unmountOnExit>
        {state => (
          <div
            key='snackbar'
            className='snackbar'
            onMouseEnter={this.clearCloseTimer}
            onMouseLeave={this.startCloseTimer}>
            <div className='inner'>
              <span className='snack-bar-message'>{message}</span>
              { action && <button onClick={onButtonClick} />}
            </div>
          </div>
        )}
      </CSSTransition>
    );
  }
}

export default SnackBar;
