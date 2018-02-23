import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const SectionTitle = ({ name }) => (
  <div className='section-title'>
    <div className='inner'>
      {name}
    </div>
  </div>
);

SectionTitle.propTypes = {
  name: PropTypes.string.isRequired
};

export default SectionTitle;
