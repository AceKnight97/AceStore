import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Button } from 'antd';

const ButtonCT = (props) => {
  const {
    className, type, title, onClick,
  } = props;

  return (
    <Button
      onClick={onClick}
      type={type}
      className={classnames('button-ct-wrapper', className)}
    >
      {title}
    </Button>
  );
};

ButtonCT.defaultProps = {
  className: '',
  type: undefined,
  title: '',
  onClick: () => { },
};
ButtonCT.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonCT;
