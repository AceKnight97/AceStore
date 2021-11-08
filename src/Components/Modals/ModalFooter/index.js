import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import classnames from 'classnames';

const ModalFooter = props => (
  <div className={classnames('modal-footer-wrapper', props.className)}>

    {
      props.dangerTitle ? (
        <Button
          danger
          className={props.dangerTitle}
          onClick={props.onClickDanger}
          disabled={props.loading}
        >
          {props.dangerTitle}
        </Button>
      ) : <div />
    }

    <div className="modal-footer-buttons">
      <Button className={props.leftBtnClassName} onClick={props.onClickLeftBtn} disabled={props.loading}>
        {props.leftTitle}
      </Button>

      <Button type="primary" onClick={props.onClickRightBtn} disabled={props.disabled} loading={props.loading}>
        {props.rightTitle}
      </Button>
    </div>
  </div>
);

ModalFooter.defaultProps = {
  className: undefined,
  disabled: false,
  loading: false,
  leftBtnClassName: 'mr8',
  dangerTitle: '',
  onClickDanger: () => {},
};

ModalFooter.propTypes = {
  className: PropTypes.string,
  leftTitle: PropTypes.string.isRequired,
  rightTitle: PropTypes.string.isRequired,
  onClickRightBtn: PropTypes.func.isRequired,
  onClickLeftBtn: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  leftBtnClassName: PropTypes.string,
  dangerTitle: PropTypes.string,
  onClickDanger: PropTypes.func,
};

export default ModalFooter;
