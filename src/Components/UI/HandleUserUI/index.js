import { Button } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import auth from "../../../Helpers/auth";
import { useMergeState } from "../../../Helpers/customHooks";
import InputCT from "../../Inputs/InputCT";
import RadioCT from "../../Inputs/RadioCT";
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
  const { role } = originalData;
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

  const onClickConfirmVerify = () => {};

  const renderView = () => {
    switch (type) {
      case "EDIT":
        return (
          <div className="handle-user-ui-edit-wrapper">
            <div className="handle-user-ui-editing">
              <InputCT
                title="Email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email"
                errMes={emailErr}
              />
              <InputCT
                title="Username"
                name="username"
                value={username}
                onChange={onChange}
                placeholder="Enter your username"
                errMes={usernameErr}
                className="mt-16"
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
                allowLeadingZeros
                prefix="+"
                maxLength={15}
                disabled
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
              <InputCT
                type="DATE"
                title="Date of birth"
                name="dob"
                value={dob}
                onChange={onChange}
                placeholder="Enter your dob"
                className="mt-16"
              />
              <RadioCT
                data={["Male", "Female", "Other"]}
                value={gender}
                name="gender"
                title="Gender"
                titleClassName="pos-re"
                className="mt-16"
                onChange={onChange}
              ></RadioCT>
            </div>
          </div>
        );
      case "CHANGE_PASSWORD":
        return (
          <div className="handle-user-ui-edit-wrapper">
            <div className="handle-user-ui-editing"></div>
          </div>
        );
      case "VERIFY":
        return (
          <div className="handle-user-ui-edit-wrapper">
            <div className="handle-user-ui-editing"></div>
          </div>
        );
      default:
        return (
          <>
            <div className="fr-sb">
              <div className="flex">
                <span className="b mr-4">Email:</span>
                <span>{email}</span>
              </div>
              <div className="flex">
                <span className="b mr-4">Username:</span>
                <span>{username}</span>
              </div>
              <div className="flex">
                <span className="b mr-4">Phone:</span>
                <span>{phone}</span>
              </div>
            </div>
            <div className="fr-sb">
              <div className="flex">
                <span className="b mr-4">Address:</span>
                <span>{address}</span>
              </div>
              <div className="flex">
                <span className="b mr-4">Role:</span>
                <span>{role || "Customer"}</span>
              </div>
            </div>
          </>
        );
    }
  };

  const renderBtns = () => {
    switch (type) {
      case "EDIT":
        return (
          <div className="handle-user-ui-btns">
            <Button className="mr-32" onClick={onClickCancel}>
              Cancel
            </Button>

            <Button type="primary" onClick={onClickConfirm}>
              Confirm
            </Button>
          </div>
        );
      case "CHANGE_PASSWORD":
        return (
          <div className="handle-user-ui-btns">
            <Button className="mr-32" onClick={onClickCancel}>
              Cancel
            </Button>

            <Button type="primary" onClick={onClickConfirmChangePas}>
              Change
            </Button>
          </div>
        );
      case "VERIFY":
        return (
          <div className="handle-user-ui-btns">
            <Button className="mr-32" onClick={onClickCancel}>
              Cancel
            </Button>

            <Button type="primary" onClick={onClickConfirmVerify}>
              Verify
            </Button>
          </div>
        );
      default:
        // DISPLAY
        return (
          <div className="handle-user-ui-btns">
            {!originalData?.isVerified && (
              <Button
                className="mr-32"
                type="dashed"
                onClick={onClickVerifyAccount}
              >
                Verify account
              </Button>
            )}
            <Button className="mr-32" onClick={onClickChangePass}>
              Change password
            </Button>

            <Button type="primary" onClick={onClickChangeInfo}>
              Change info
            </Button>
          </div>
        );
    }
  };

  return (
    <div className={classnames("handle-user-ui", className)}>
      {renderView()}
      {renderBtns()}
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
