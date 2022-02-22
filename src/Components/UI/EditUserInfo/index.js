import { Button } from "antd";
import classnames from "classnames";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { useMergeState } from "../../../Helpers/customHooks";
import InputCT from "../../Inputs/InputCT";
import RadioCT from "../../Inputs/RadioCT";
import "./_edit-user-info.scss";

const EditUserInfo = (props) => {
  const [state, setState] = useMergeState({
    email: props.email,
    username: props.username,
    phone: props.phone,
    address: props.address,
    dob: props.dob,
    gender: props.gender,
    emailErr: "",
    usernameErr: "",
    phoneErr: "",
    addressErr: "",
    type: "DISPLAY",
  });
  const { className, role, onClickCancel, onClickConfirm } = props;
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
  } = state;

  const onChange = (key, value) => {
    setState({ [key]: value });
  };

  return (
    <div className={classnames("edit-user-info", className)}>
      <div className="edit-user-info-wrapper">
        <div className="edit-user-info-editing">
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
            title="Role"
            name="role"
            value={role}
            onChange={onChange}
            placeholder="Enter your role"
            className="mt-16"
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
            disabledDate="PAST"
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
      <div className="handle-user-ui-btns">
        <Button className="mr-32" onClick={onClickCancel}>
          Cancel
        </Button>

        <Button type="primary" onClick={onClickConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
};
EditUserInfo.defaultProps = {
  className: "",
  email: "",
  username: "",
  phone: "",
  address: "",
  role: "",
  gender: "",
  dob: undefined,
  onClickCancel: () => {},
  onClickConfirm: () => {},
};
EditUserInfo.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  role: PropTypes.string,
  gender: PropTypes.string,
  dob: PropTypes.shape(),
  onClickCancel: PropTypes.func,
  onClickConfirm: PropTypes.func,
};

export default EditUserInfo;
