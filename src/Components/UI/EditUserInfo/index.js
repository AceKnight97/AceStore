import { Button } from "antd";
import classnames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import auth from "../../../Helpers/auth";
import { useMergeState } from "../../../Helpers/customHooks";
import { isValidEmail } from "../../../Utils";
import InputCT from "../../Inputs/InputCT";
import RadioCT from "../../Inputs/RadioCT";
import { mutationUpdateUser } from "./helper";
import "./_edit-user-info.scss";

const EditUserInfo = (props) => {
  const originalData = useRef({
    email: props.email,
    username: props.username,
    address: props.address,
    dob: props.dob,
    gender: props.gender,
  });
  const [state, setState] = useMergeState({
    email: props.email,
    username: props.username,
    address: props.address,
    dob: props.dob,
    gender: props.gender,
    usernameErr: "",
    addressErr: "",
    loading: false,
  });
  const { className, role, onClickCancel, phone } = props;
  const {
    email,
    username,
    address,
    dob,
    gender,

    usernameErr,
    phoneErr,
    addressErr,
    loading,
  } = state;

  const onChange = (key, value) => {
    setState({
      [key]: value,
      usernameErr: "",
      addressErr: "",
    });
  };

  const onClickConfirm = async () => {
    setState({ loading: true });
    const res = await mutationUpdateUser(state);
    // console.log({ res });
    if (res.isSuccess) {
      auth.setDatalogin(res.user);
      alert("Successfully update user information!");
      onClickCancel();
    } else {
      alert("Failed to update user information, please try again!");
    }
    setState({ loading: false });
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
            errMes={email && isValidEmail(email) ? "" : "Invalid email!"}
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
        <Button className="mr-32" onClick={onClickCancel} disabled={loading}>
          Cancel
        </Button>

        <Button
          type="primary"
          onClick={onClickConfirm}
          loading={loading}
          disabled={_.isEqual(originalData.current, {
            email,
            username,
            address,
            dob,
            gender,
          })}
        >
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
};
EditUserInfo.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  role: PropTypes.string,
  gender: PropTypes.string,
  dob: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
  onClickCancel: PropTypes.func,
};

export default EditUserInfo;
