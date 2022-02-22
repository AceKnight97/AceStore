import { Button } from "antd";
import classnames from "classnames";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import auth from "../../../Helpers/auth";
import { useMergeState } from "../../../Helpers/customHooks";
import InputCT from "../../Inputs/InputCT";
import RadioCT from "../../Inputs/RadioCT";
import ChangeUserPassword from "../ChangeUserPassword";
import DisplayUserInfo from "../DisplayUserInfo";
import EditUserInfo from "../EditUserInfo";
import VerifyAccount from "../VerifyAccount";
import "./_handle-user-ui.scss";

const HandleUserUI = (props) => {
  const originalData = auth.getDataLogin();
  const [state, setState] = useMergeState({
    email: originalData.email || "",
    username: originalData.username || "",
    phone: originalData.phone || "",
    address: originalData.address || "",
    dob: originalData.dob || "",
    gender: originalData.gender || "",
    emailErr: "",
    usernameErr: "",
    phoneErr: "",
    addressErr: "",
    type: "DISPLAY",
  });
  const { className } = props;
  const { role, isVerified } = originalData;
  const {
    email,
    username,
    phone,
    address,
    dob,
    gender,

    emailErr,
    usernameErr,
    phoneErr,
    addressErr,

    type,
  } = state;

  const onChange = (key, value) => {
    setState({ [key]: value });
  };

  const onClickCancel = () => {
    setState({ type: "DISPLAY" });
  };

  const onClickChangeInfo = () => {
    setState({ type: "EDIT" });
  };

  const onClickVerifyAccount = () => {
    setState({ type: "VERIFY" });
  };

  const onClickChangePass = () => {
    setState({ type: "CHANGE_PASSWORD" });
  };

  const onClickConfirm = () => {};

  const onClickConfirmChangePas = () => {};

  const renderView = () => {
    switch (type) {
      case "EDIT":
        return (
          <EditUserInfo
            username={username}
            email={email}
            phone={phone}
            address={address}
            gender={gender}
            dob={dob || undefined}
            role={role}
            onClickCancel={onClickCancel}
            onClickConfirm={onClickConfirm}
          ></EditUserInfo>
        );
      case "CHANGE_PASSWORD":
        return (
          <ChangeUserPassword
            onClickCancel={onClickCancel}
          ></ChangeUserPassword>
        );
      case "VERIFY":
        return <VerifyAccount onClickCancel={onClickCancel}></VerifyAccount>;
      default:
        return (
          <DisplayUserInfo
            username={username}
            email={email}
            phone={phone}
            address={address}
            gender={gender}
            dob={dob ? moment(dob).format("DD/MM/YYYY") : ""}
            role={role}
            isVerified={isVerified}
            onClickVerifyAccount={onClickVerifyAccount}
            onClickChangePass={onClickChangePass}
            onClickChangeInfo={onClickChangeInfo}
          ></DisplayUserInfo>
        );
    }
  };

  return (
    <div className={classnames("handle-user-ui", className)}>
      {renderView()}
    </div>
  );
};
HandleUserUI.defaultProps = {
  className: "",
};
HandleUserUI.propTypes = {
  className: PropTypes.string,
};

export default HandleUserUI;
