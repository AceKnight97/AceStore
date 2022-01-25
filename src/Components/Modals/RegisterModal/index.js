import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import { Modal } from "antd";
import ModalHeader from "../ModalHeader";
import ModalFooter from "../ModalFooter";
import { useMergeState } from "../../../Helpers/customHooks";
import InputCT from "../../Inputs/InputCT";
import {
  disabledRegister,
  handleRightBtnClick,
  mutationCreateUser,
  setDefaultData,
} from "./helper";
import auth from "../../../Helpers/auth";

const DEFAULT_DATA = {
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
  phone: "",
  address: "",

  emailErr: "",
  passwordErr: "",
  confirmPasswordErr: "",
  usernameErr: "",
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
    email,
    password,
    confirmPassword,
    username,
    phone,
    address,
    emailErr,
    passwordErr,
    confirmPasswordErr,
    usernameErr,
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
    const res = handleRightBtnClick(state);
    if (res.finish) {
      const obj = { loading: false };
      setState({ loading: true });
      const resFinish = await mutationCreateUser(state);
      console.log({ resFinish });

      if (resFinish.isSuccess) {
        // auth.setHeaderData(resFinish.data);
        alert("Successfully creating user!");
        onClickCancel();
      } else {
        alert("Failed to create user: " + resFinish.message);
      }
      setState(obj);
    } else {
      setState(res);
    }
  };

  const renderStep1 = () => (
    <>
      <InputCT
        title="Email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Enter your email"
        errMes={emailErr}
      />
      <InputCT
        title="Password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Enter your email"
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
    </>
  );

  const renderStep2 = () => (
    <>
      <InputCT
        title="Username"
        name="username"
        value={username}
        onChange={onChange}
        placeholder="Enter your username"
        errMes={usernameErr}
      />
      <InputCT
        title="Phone number"
        name="phone"
        value={phone}
        onChange={onChange}
        placeholder="Enter your phone number"
        className="mt-16"
        type="NUMBER"
        errMes={phoneErr}
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
        <ModalHeader
          title={`Register step ${isStep1 ? "1" : "2"}/2`}
          onClick={onClickCancel}
        />

        <div className="register-modal-main">
          {isStep1 ? renderStep1() : renderStep2()}
        </div>

        <ModalFooter
          disabled={disabledRegister(state)}
          leftTitle={isStep1 ? "Cancel" : "Back to step 1"}
          rightTitle={isStep1 ? "Next" : "Finish"}
          onClickLeftBtn={isStep1 ? onClickCancel : onClickBack}
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
