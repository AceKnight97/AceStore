import { Modal } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { getPrice } from "../../../Helpers";
import { useMergeState } from "../../../Helpers/customHooks";
import DisplayRating from "../../UI/DisplayRating";
import ModalHeader from "../ModalHeader";
import "./_user-info-modal.scss";

const UserInfoModal = (props) => {
  const { visible, className, toggleClick, loading, data } = props;
  const { username, email, address, phone } = data;
  return (
    <Modal
      className="user-info-modal"
      visible={visible}
      closable={false}
      footer={null}
      destroyOnClose
      centered
      onCancel={toggleClick}
    >
      <div className={classnames("user-info-modal-wrapper", className)}>
        <ModalHeader title={username} onClick={toggleClick} />

        <div className="user-info-modal-main">
          <div className="fr-sb">
            <span className="b">Email:</span>
            <span className="ml-4">{email}</span>
          </div>
          <div className="fr-sb">
            <span className="b">Username:</span>
            <span className="ml-4">{username}</span>
          </div>
          <div className="fr-sb">
            <span className="b">Delivery:</span>
            <span className="ml-4">{address}</span>
          </div>
          <div className="fr-sb">
            <span className="b">Phone number:</span>
            <span className="ml-4">{phone}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
UserInfoModal.defaultProps = {
  className: "",
  data: {},
  loading: false,
  visible: false,
  toggleClick: () => {},
};
UserInfoModal.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape(),
  toggleClick: PropTypes.func,
  visible: PropTypes.bool,
  loading: PropTypes.bool,
};

export default UserInfoModal;
