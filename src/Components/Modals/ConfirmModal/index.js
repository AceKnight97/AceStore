import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import classnames from "classnames";
import "./_confirm-modal.scss";

const ConfirmModal = (props) => {
  let title;
  let content;
  let leftBtnTitle;
  let rightBtnTitle;
  let isDanger = false;
  const {
    visible,
    type,
    className,
    icon,
    children,
    toggleClick,
    onClick,
    loading,
  } = props;
  switch (type) {
    case "CLONE_ORDER": {
      title = "Clone the order";
      content = "Are you sure want to clone this order?";
      leftBtnTitle = "Cancel";
      rightBtnTitle = "Yes";
      break;
    }
    default: {
      break;
    }
  }
  return (
    <Modal
      className="modal-send-report"
      visible={visible}
      closable={false}
      footer={null}
      destroyOnClose
      centered
    >
      <div className={classnames("confirm-modal", className)}>
        <div className="confirm-modal-body">
          <div className="cl-body-row">
            {icon ? icon : <QuestionCircleOutlined className="row-icon" />}

            <div className="row-title">
              <span>{title}</span>
            </div>
          </div>

          {content && (
            <div className="cl-body-content">
              <span>{content}</span>
            </div>
          )}

          {children}
        </div>
        <div className="confirm-modal-footer">
          <div className="cl-footer-buttons">
            <Button className="mr8" onClick={toggleClick} disabled={loading}>
              {leftBtnTitle}
            </Button>
            <Button
              type="primary"
              danger={isDanger}
              onClick={onClick}
              loading={loading}
            >
              {rightBtnTitle}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
ConfirmModal.defaultProps = {
  className: undefined,
  type: "CLONE_ORDER",
  loading: false,
  icon: undefined,
  visible: false,
  message: "",
  rightBtnTitle: "",
  children: null,
  toggleClick: () => {},
};
ConfirmModal.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  toggleClick: PropTypes.func,
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  message: PropTypes.string,
  rightBtnTitle: PropTypes.string,
  children: PropTypes.node,
};
export default ConfirmModal;
