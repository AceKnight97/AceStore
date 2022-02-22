import { Modal } from "antd";
import classnames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useMergeState } from "../../../Helpers/customHooks";
import InputCT from "../../Inputs/InputCT";
import ModalFooter from "../ModalFooter";
import ModalHeader from "../ModalHeader";
import {
  disabledRegister,
  handleRightBtnClick,
  mutationCreateUser,
} from "./helper";

const DEFAULT_DATA = {
  password: "",
  confirmPassword: "",
  phone: "",
  address: "",

  passwordErr: "",
  confirmPasswordErr: "",
  phoneErr: "",
  addressErr: "",

  loading: false,
  isStep1: true,
};

const RegisterModal = (props) => {
  const [state, setState] = useMergeState({
    ...DEFAULT_DATA,
  });
  const { className, visible, onClickCancel } = props;
  const {
    password,
    confirmPassword,
    phone,
    address,

    passwordErr,
    confirmPasswordErr,
    phoneErr,
    addressErr,

    loading,
    isStep1,
  } = state;

  useEffect(() => {
    // setState({ ...setDefaultData() });
    if (!visible) {
      setState({ ...DEFAULT_DATA });
    }
  }, [visible]);

  const onClickBack = () => {
    setState({ isStep1: true });
  };

  const onChange = (key, value) => {
    const obj = { [key]: value };
    if (isStep1) {
      _.assign(obj, { emailErr: "", passwordErr: "", confirmPasswordErr: "" });
      setState(obj);
    } else {
      _.assign(obj, {
        usernameErr: "",
        phoneErr: "",
        addressErr: "",
      });
      setState(obj);
    }
  };

  const onClickRightBtn = async () => {
    const errObj = handleRightBtnClick(state);
    if (_.isEmpty(errObj)) {
      const obj = { loading: false };
      setState({ loading: true });
      const res = await mutationCreateUser(state);
      if (res.isSuccess) {
        alert("Successfully creating user!");
        onClickCancel();
      } else {
        alert("Failed to create user: " + res.message);
      }
      setState(obj);
    } else {
      setState(errObj);
    }
  };

  const renderMain = () => (
    <>
      <InputCT
        title="Phone number"
        name="phone"
        value={phone}
        onChange={onChange}
        placeholder="Enter your phone number"
        className="mt-16"
        type="NUMBER"
        errMes={phoneErr}
        allowLeadingZeros
        prefix="+"
        maxLength={15}
      />
      <InputCT
        title="Password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Enter your password"
        type="PASSWORD"
        className="mt-16"
        errMes={passwordErr}
      />
      <InputCT
        title="Confirm password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={onChange}
        placeholder="Enter your confirm password"
        type="PASSWORD"
        className="mt-16"
        errMes={confirmPasswordErr}
      />
      <InputCT
        title="Address"
        name="address"
        value={address}
        onChange={onChange}
        placeholder="Enter your address"
        className="mt-16"
        errMes={addressErr}
      />
    </>
  );

  return (
    <Modal
      className="register-modal"
      destroyOnClose
      visible={visible}
      footer={null}
      closable={false}
      centered
    >
      <div className={classnames("register-modal-wrapper", className)}>
        <ModalHeader title="Register" onClick={onClickCancel} />

        <div className="register-modal-main">{renderMain()}</div>

        <ModalFooter
          disabled={disabledRegister(state)}
          leftTitle={"Cancel"}
          rightTitle={"Register"}
          onClickLeftBtn={onClickBack}
          onClickRightBtn={onClickRightBtn}
          loading={loading}
        />
      </div>
    </Modal>
  );
};
RegisterModal.defaultProps = {
  className: "",
  visible: false,
  onClickCancel: () => {},
};
RegisterModal.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
  onClickCancel: PropTypes.func,
};

export default RegisterModal;
