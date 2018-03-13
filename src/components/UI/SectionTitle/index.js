import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const SectionTitle = ({ name, count }) => (
  <div className='section-title'>
    <div className='inner'>
      <span className='section-title-content'>
        {name}
      </span>
      { count && <span className='section-title-badge'>{count}</span> }
    </div>
  </div>
);

SectionTitle.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number
};

export default SectionTitle;
