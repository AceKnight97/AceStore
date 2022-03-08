import { Button } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import "./_display-user-info.scss";

const DisplayUserInfo = (props) => {
  const {
    email,
    username,
    phone,
    address,
    role,
    gender,
    dob,
    className,
    isVerified,
    onClickVerifyAccount,
    onClickChangePass,
    onClickChangeInfo,
  } = props;

  return (
    <div className={classnames("display-user-info", className)}>
      <div className="fr-sb">
        <div className="flex">
          <span className="b mr-4">Phone:</span>
          <span>{phone}</span>
        </div>
        <div className="flex">
          <span className="b mr-4">Role:</span>
          <span>{role || "Customer"}</span>
        </div>
        <div className="flex">
          <span className="b mr-4">Email:</span>
          <span>{email}</span>
        </div>
      </div>
      <div className="fr-sb">
        <div className="flex">
          <span className="b mr-4">Address:</span>
          <span>{address}</span>
        </div>
        <div className="flex">
          <span className="b mr-4">Gender:</span>
          <span>{gender}</span>
        </div>
        <div className="flex">
          <span className="b mr-4">Username:</span>
          <span>{username}</span>
        </div>
      </div>
      <div className="fr-sb">
        <div className="flex">
          <span className="b mr-4">DOB:</span>
          <span>{dob}</span>
        </div>
      </div>

      <div className="handle-user-ui-btns">
        {!isVerified && email && (
          <Button type="dashed" onClick={onClickVerifyAccount}>
            Verify account
          </Button>
        )}
        <Button className="ml-32" onClick={onClickChangePass}>
          Change password
        </Button>

        <Button type="primary" className="ml-32" onClick={onClickChangeInfo}>
          Change info
        </Button>
      </div>
    </div>
  );
};
DisplayUserInfo.defaultProps = {
  className: "",
  email: "",
  username: "",
  phone: "",
  address: "",
  role: "",
  gender: "",
  dob: "",
  isVerified: false,
  onClickVerifyAccount: () => {},
  onClickChangePass: () => {},
  onClickChangeInfo: () => {},
};
DisplayUserInfo.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  role: PropTypes.string,
  gender: PropTypes.string,
  dob: PropTypes.string,
  isVerified: PropTypes.bool,
  onClickVerifyAccount: PropTypes.func,
  onClickChangePass: PropTypes.func,
  onClickChangeInfo: PropTypes.func,
};

export default DisplayUserInfo;
