import { Button } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { useMergeState } from "../../../Helpers/customHooks";
import InputCT from "../../Inputs/InputCT";
import ConfirmModal from "../../Modals/ConfirmModal";
import { mutationChangePassword } from "./helper";
import "./_change-user-password.scss";

const ChangeUserPassword = (props) => {
  const [state, setState] = useMergeState({
    password: "",
    newPassword: "",
    confirmPassword: "",

    passwordErr: "",
    newPasswordErr: "",
    confirmPasswordErr: "",

    visibleChangePass: false,
    loading: false,
  });
  const { className, onClickCancel } = props;
  const {
    password,
    newPassword,
    confirmPassword,
    passwordErr,
    newPasswordErr,
    confirmPasswordErr,
    visibleChangePass,
    loading,
  } = state;

  const onChange = (key, value) => {
    setState({
      [key]: value,
      confirmPasswordErr: "",
      newPasswordErr: "",
      passwordErr: "",
    });
  };

  const toggleClickChangePass = () => {
    if (password && password.length < 6) {
      setState({ passwordErr: "Password is too short" });
      return;
    }
    if (confirmPassword && confirmPassword !== newPassword) {
      setState({ confirmPasswordErr: "Confirm password doesn't match" });
      return;
    }
    if (newPassword && newPassword.length < 6) {
      setState({ newPasswordErr: "New password is too short" });
      return;
    }
    setState({ visibleChangePass: !visibleChangePass });
  };

  const onClickChangePass = async () => {
    setState({ loading: true });
    const res = await mutationChangePassword(password, newPassword);
    if (res.isSuccess) {
      onClickCancel();
    }
    setState({ loading: false, visibleChangePass: false });
  };

  return (
    <div className={classnames("change-user-password", className)}>
      <div className="change-user-password-wrapper">
        <div className="change-user-password-editing">
          <InputCT
            title="Current password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter your password"
            errMes={passwordErr}
            type="PASSWORD"
          />

          <InputCT
            className="mt-16"
            title="New password"
            name="newPassword"
            value={newPassword}
            onChange={onChange}
            placeholder="Enter your new password"
            errMes={newPasswordErr}
            type="PASSWORD"
          />
          <InputCT
            className="mt-16"
            title="Confirm new password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            placeholder="Enter your new password again"
            errMes={confirmPasswordErr}
            type="PASSWORD"
          />
        </div>
      </div>

      <div className="handle-user-ui-btns">
        <Button onClick={onClickCancel} disabled={loading}>
          Cancel
        </Button>

        <Button
          className="ml-32"
          type="primary"
          onClick={toggleClickChangePass}
          loading={loading}
          disabled={!password || !newPassword || !confirmPassword}
        >
          Change
        </Button>
      </div>
      <ConfirmModal
        type="CHANGE_PASSWORD"
        toggleClick={toggleClickChangePass}
        onClick={onClickChangePass}
        visible={visibleChangePass}
      ></ConfirmModal>
    </div>
  );
};
ChangeUserPassword.defaultProps = {
  className: "",
  email: "",
  username: "",
  phone: "",
  address: "",
  role: "",
  gender: "",
  dob: undefined,
  onClickCancel: () => {},
};
ChangeUserPassword.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  role: PropTypes.string,
  gender: PropTypes.string,
  dob: PropTypes.shape(),
  onClickCancel: PropTypes.func,
};

export default ChangeUserPassword;
