import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Button } from 'antd';

const InfoRow = (props) => {
  const {
    className, title, icon, type, link,
  } = props;
  return (
    <div className={classnames('info-row-wrapper', className)}>
      <div className='info-row-icon'>
        {icon}
      </div>
      {type === 'LINK'
        ? (
          <a href={link} target=' ' className='info-row-title'>
            {title}
          </a>
      // <Button
      //   onClick={() => window.open(title, '')}
      //   type='link'
      //   className='info-row-title'
      // >
      //   {title}
      // </Button>
        )
        : (
          <div className='info-row-title'>
            <span>{title}</span>
          </div>
        )}
    </div>
  );
};
InfoRow.defaultProps = {
  className: '',
  title: '',
  icon: '',
  type: '',
  link: '',
};
InfoRow.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]),
  type: PropTypes.string,
  link: PropTypes.string,
};

export default InfoRow;
