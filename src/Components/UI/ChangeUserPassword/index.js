import { Button } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { useMergeState } from "../../../Helpers/customHooks";
import InputCT from "../../Inputs/InputCT";
import "./_change-user-password.scss";

const ChangeUserPassword = (props) => {
  const [state, setState] = useMergeState({
    password: "",
    newPassword: "",
    confirmPassword: "",

    passwordErr: "",
    newPasswordErr: "",
    confirmPasswordErr: "",
  });
  const { className, onClickCancel } = props;
  const {
    password,
    newPassword,
    confirmPassword,
    passwordErr,
    newPasswordErr,
    confirmPasswordErr,
  } = state;

  const onChange = (key, value) => {
    setState({ [key]: value });
  };

  const onClickConfirmChangePas = () => {
    onClickCancel();
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
        <Button className="mr-32" onClick={onClickCancel}>
          Cancel
        </Button>

        <Button type="primary" onClick={onClickConfirmChangePas}>
          Change
        </Button>
      </div>
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
