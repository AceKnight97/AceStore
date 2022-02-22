import { Button } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import ReactCodeInput from "react-verification-code-input";
import { useMergeState } from "../../../Helpers/customHooks";
import "./_verify-account.scss";

const VerifyAccount = (props) => {
  const showNotificationTime = useRef(0);
  const [state, setState] = useMergeState({
    verifycationCode: "",
    invalidCode: "",
    countingTime: 60,
    loading: false,
  });
  const { className, onClickCancel } = props;
  const { verifycationCode, invalidCode, countingTime, loading } = state;

  useEffect(() => {
    setTimeout(() => {
      if (countingTime > 0) {
        setState({ countingTime: countingTime - 1 });
      }
    }, 1000);
  }, [state.countingTime]);

  const onChange = (key, value) => {
    setState({ [key]: value });
  };

  const onClickVerify = () => {
    setState({ countingTime: 60 });
  };

  return (
    <div className={classnames("verify-account", className)}>
      <div className="verify-account-wrapper">
        <div className="verify-account-editing">
          <ReactCodeInput
            autoFocus={false}
            values={verifycationCode.split()}
            type="number"
            className={invalidCode ? "invalid-code" : ""}
            fieldWidth={32}
            fieldHeight={40}
            fields={6}
            placeholder={["_", "_", "_", "_", "_", "_"]}
            onChange={(x) => onChange("verifycationCode", x)}
            title="Verify account"
          />

          {invalidCode ? (
            <div className="div-incorrect-mes">
              <span>{invalidCode}</span>
            </div>
          ) : null}

          <div className="verify-account-resend">
            {/* {countingTime !== 0 && (
              <div className="verify-account-countdown">{countingTime}</div>
            )} */}
            <Button type="link" className="mt-16" disabled={countingTime !== 0}>
              {`Resend code ${countingTime}`}
            </Button>
          </div>
        </div>
      </div>

      <div className="handle-user-ui-btns">
        <Button className="mr-32" onClick={onClickCancel}>
          Cancel
        </Button>

        <Button type="primary" onClick={onClickVerify}>
          Verify
        </Button>
      </div>
    </div>
  );
};
VerifyAccount.defaultProps = {
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
VerifyAccount.propTypes = {
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

export default VerifyAccount;
