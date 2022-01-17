import { Modal } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { getPrice } from "../../../Helpers";
import { useMergeState } from "../../../Helpers/customHooks";
import DisplayRating from "../../UI/DisplayRating";
import ModalHeader from "../ModalHeader";
import "./_food-info-modal.scss";

const FoodInfoModal = (props) => {
  const { visible, className, toggleClick, loading, data } = props;
  const { name, price, image, rating } = data;
  return (
    <Modal
      className="food-info-modal"
      visible={visible}
      closable={false}
      footer={null}
      destroyOnClose
      centered
      onCancel={toggleClick}
    >
      <div className={classnames("food-info-modal-wrapper", className)}>
        <ModalHeader title={name} onClick={toggleClick} />

        <div className="food-info-modal-main">
          <img src={image} alt="Food card img"></img>
          <div className="fr-sb mt-16">
            <div className="flex">
              <span className="b">Rating:</span>
              <DisplayRating rating={rating} className="ml-4"></DisplayRating>
            </div>
            <div className="flex">
              <span className="b">Price:</span>
              <span className="ml-4">{getPrice(price, undefined, "")}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
FoodInfoModal.defaultProps = {
  className: "",
  data: {},
  loading: false,
  visible: false,
  toggleClick: () => {},
};
FoodInfoModal.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape(),
  toggleClick: PropTypes.func,
  visible: PropTypes.bool,
  loading: PropTypes.bool,
};

export default FoodInfoModal;
