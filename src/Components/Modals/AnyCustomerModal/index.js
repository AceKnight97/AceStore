import { Modal } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useMergeState } from "../../../Helpers/customHooks";
import InputCT from "../../Inputs/InputCT";
import ModalFooter from "../ModalFooter";
import ModalHeader from "../ModalHeader";
import "./_any-customer-modal.scss";

const MY_DATA = {
  phone: "",
  address: "",
  notes: "",
};

const DEFAULT_DATA = {
  phone: "",
  address: "",
  notes: "",

  loading: false,
  isConfirm: false,
};

const AnyCustomerModal = (props) => {
  const [state, setState] = useMergeState({
    ...DEFAULT_DATA,
  });

  useEffect(() => {
    if (!visible) {
      setState({ ...DEFAULT_DATA });
    }
  }, [props.visible]);

  const { className, visible, onClickCancel, onClick } = props;
  const { loading, phone, address, notes, isConfirm } = state;

  const onChange = (key, value) => {
    setState({
      [key]: value,
      destinationErr: "",
    });
  };

  const onClickRightBtn = async () => {
    if (isConfirm) {
      onClick(state);
    } else {
      setState({ isConfirm: true });
    }
  };
  const onClickBack = async () => {
    setState({ isConfirm: false });
  };

  return (
    <Modal
      className="any-customer-modal"
      destroyOnClose
      visible={visible}
      footer={null}
      closable={false}
      centered
    >
      <div className={classnames("any-customer-modal-wrapper", className)}>
        <ModalHeader title="Customer info" onClick={onClickCancel} />

        {isConfirm ? (
          <div className="any-customer-modal-main">
            <div className="font-20 b">Your information:</div>
            <div className="fr-sb">
              <span className="b">Phone number:</span>
              <span className="ml-4">{phone}</span>
            </div>
            <div className="fr-sb">
              <span className="b">Address:</span>
              <span className="ml-4">{address}</span>
            </div>
            <div className="fr-sb">
              <span className="b">Notes:</span>
              <span className="ml-4">{notes}</span>
            </div>
            <div className="fcen mt-16 b">Do you want to order now?</div>
          </div>
        ) : (
          <div className="any-customer-modal-main">
            <InputCT
              title="Phone number"
              name="phone"
              value={phone}
              onChange={onChange}
              placeholder="Enter your phone number"
              type="NUMBER"
              allowLeadingZeros
              prefix="+"
              maxLength={15}
            />
            <InputCT
              title="Address"
              name="address"
              value={address}
              onChange={onChange}
              placeholder="Enter your address"
              className="mt-16"
            />
            <InputCT
              title="Notes"
              name="notes"
              value={notes}
              onChange={onChange}
              placeholder="Enter your notes"
              className="mt-16"
              type="TEXTAREA"
            />
          </div>
        )}

        <ModalFooter
          disabled={!address || !phone}
          leftTitle={isConfirm ? "Back" : "Cancel"}
          rightTitle={isConfirm ? "Yes" : "Order"}
          onClickLeftBtn={isConfirm ? onClickBack : onClickCancel}
          onClickRightBtn={onClickRightBtn}
          loading={loading}
        />
      </div>
    </Modal>
  );
};
AnyCustomerModal.defaultProps = {
  className: undefined,
  visible: false,
  onClickCancel: () => {},
  onClick: () => {},
};
AnyCustomerModal.propTypes = {
  className: PropTypes.string,
  onClickCancel: PropTypes.func,
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};
export default AnyCustomerModal;
