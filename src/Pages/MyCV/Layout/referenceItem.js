import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { } from 'antd';

const ReferenceItem = (props) => {
  const { className, referenceData } = props;
  const {
    name, occupation, emailAddress, tel,
  } = referenceData;
  return (
    <div className={classnames('reference-item-wrapper', className)}>
      <div className=''>
        <span className='b'>Name: </span>
        <span>{name}</span>
      </div>
      <div className='mt4'>
        <span className='b'>Occupation: </span>
        <span>{occupation}</span>
      </div>
      <div className='mt4'>
        <span className='b'>Email address: </span>
        <span>{emailAddress}</span>
      </div>
      <div className='mt4'>
        <span className='b'>Tel: </span>
        <span>{tel}</span>
      </div>
    </div>
  );
};
ReferenceItem.defaultProps = {
  className: '',
  referenceData: {},
};
ReferenceItem.propTypes = {
  className: PropTypes.string,
  referenceData: PropTypes.shape(),
};

export default ReferenceItem;
