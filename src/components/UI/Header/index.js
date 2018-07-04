import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Header = ({
  title,
  leftIcon,
  onLeftPress,
  onRightPress,
  titleStyle,
  rightContent,
  largeTitle
}) => (
  <header className='header'>
    <div className='header__toolBar'>
      <div className='inner'>
        {
          leftIcon &&
          <button className='header__leftBtn' onClick={onLeftPress}>
            {leftIcon}
          </button>
        }
        <div className='header__title'>
          <span style={titleStyle}>
            {title}
          </span>
        </div>
        {
          rightContent
            ? <button className='header__rightBtn' onClick={onRightPress}>{rightContent}</button>
            : <div className='header__rightBtn' style={{ width: '24px', height: '24px' }} />
        }
      </div>
    </div>
    <div className='header__largeTitle'>
      <div className='inner'>
        {largeTitle}
      </div>
    </div>
  </header>
);

Header.propTypes = {
  leftIcon: PropTypes.object,
  rightContent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  title: PropTypes.string,
  onLeftPress: PropTypes.func,
  onRightPress: PropTypes.func,
  titleStyle: PropTypes.object,
  largeTitle: PropTypes.string
};

export default Header;
