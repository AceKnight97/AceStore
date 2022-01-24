import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import { Modal } from "antd";
import ModalHeader from "../ModalHeader";
import ModalFooter from "../ModalFooter";
import { useMergeState } from "../../../Helpers/customHooks";
import auth from "../../../Helpers/auth";
import InputCT from "../../Inputs/InputCT";
import { checkValidLogin, mutationSignIn } from "./helper";

const DEFAULT_DATA = {
  email: "tttriet1997@gmail.com",
  password: "0819541897",
};

const LoginModal = (props) => {
  const [state, setState] = useMergeState({
    email: "",
    password: "",
    emailErr: "",
    passwordErr: "",
    loading: false,
  });
  const { className, visible, onClickCancel } = props;
  const { email, password, emailErr, passwordErr, loading } = state;

  useEffect(() => {
    // setState({ ...DEFAULT_DATA });
  }, []);

  const onChange = (key, value) => {
    setState({ [key]: value, emailErr: "", passwordErr: "" });
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
        </div>

        <ModalFooter
          disabled={!email || !password}
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
