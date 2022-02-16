import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import classnames from 'classnames';

const ModalHeader = props => (
  <div className={classnames('modal-header-wrapper', props.className)}>
    <div className="modal-header-title">
      <span>{props.title}</span>
    </div>

    <Button ghost onClick={props.onClick} className={props.btnClassName} disabled={props.loading} className='modal-header-close-btn'>
      {props.btnTitle || <CloseOutlined />}
    </Button>
  </div>
);

ModalHeader.defaultProps = {
  className: undefined,
  btnClassName: undefined,
  btnTitle: '',
  loading: false,
  onClick: () => { },
};

ModalHeader.propTypes = {
  className: PropTypes.string,
  btnClassName: PropTypes.string,
  title: PropTypes.string.isRequired,
  btnTitle: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ModalHeader;
