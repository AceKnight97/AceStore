import { Modal } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import auth from "../../../Helpers/auth";
import { useMergeState } from "../../../Helpers/customHooks";
import InputCT from "../../Inputs/InputCT";
import ModalFooter from "../ModalFooter";
import ModalHeader from "../ModalHeader";
import { checkValidLogin, mutationSignIn } from "./helper";

const DEFAULT_DATA = {
  phone: "",
  password: "",
};

const LoginModal = (props) => {
  const [state, setState] = useMergeState({
    phone: "",
    password: "",
    phoneErr: "",
    passwordErr: "",
    loading: false,
  });
  const { className, visible, onClickCancel } = props;
  const { phone, password, phoneErr, passwordErr, loading } = state;

  const onChange = (key, value) => {
    setState({ [key]: value, phoneErr: "", passwordErr: "" });
  };

  const onClickRightBtn = async () => {
    const res = checkValidLogin(state);
    if (res.isSuccess) {
      setState({ loading: true });
      const resLogin = await mutationSignIn(state);
      // console.log({ resLogin });
      if (resLogin.isSuccess) {
        auth.setDatalogin(resLogin.data.user);
        props.loginRequest(resLogin.data);
        onClickCancel();
      } else {
        alert("Login failed " + resLogin.message);
      }

      setState({ loading: false });
    } else {
      setState(res);
    }
  };

  return (
    <Modal
      className="login-modal"
      destroyOnClose
      visible={visible}
      footer={null}
      closable={false}
      centered
    >
      <div className={classnames("stop-health-care-modal-wrapper", className)}>
        <ModalHeader title="Login" onClick={onClickCancel} />

        <div className="login-modal-main">
          <InputCT
            title="Phone number"
            name="phone"
            value={phone}
            onChange={onChange}
            placeholder="Enter your phone number"
            errMes={phoneErr}
            allowLeadingZeros
            prefix="+"
            type="NUMBER"
            maxLength={15}
          />
          <InputCT
            title="Password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter your phone"
            type="PASSWORD"
            className="mt-16"
            errMes={passwordErr}
          />
        </div>

        <ModalFooter
          disabled={!phone || !password}
          leftTitle="Cancel"
          rightTitle="Login"
          onClickLeftBtn={onClickCancel}
          onClickRightBtn={onClickRightBtn}
          loading={loading}
        />
      </div>
    </Modal>
  );
};
LoginModal.defaultProps = {
  className: "",
  visible: false,

  onClickCancel: () => {},
  loginRequest: () => {},
};
LoginModal.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,

  onClickCancel: PropTypes.func,
  loginRequest: PropTypes.func,
};

export default LoginModal;
