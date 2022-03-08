import { Button } from "antd";
import classnames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import ReactCodeInput from "react-verification-code-input";
import auth from "../../../Helpers/auth";
import { useMergeState } from "../../../Helpers/customHooks";
import ConfirmModal from "../../Modals/ConfirmModal";
import { mutationSendCode, mutationVerifiedEmail } from "./helper";
import "./_verify-account.scss";

const VerifyAccount = (props) => {
  const [state, setState] = useMergeState({
    verifycationCode: "",
    invalidCode: "",
    countingTime: 30,
    loading: false,
    visibleSendCode: false,
  });
  const { className, onClickCancel } = props;
  const {
    verifycationCode,
    invalidCode,
    countingTime,
    loading,
    visibleSendCode,
  } = state;

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

  const onClickSendCode = async () => {
    setState({ loading: true });
    const res = await mutationSendCode();
    const obj = { loading: false, visibleSendCode: false };
    if (res.isSuccess) {
      _.assign(obj, { countingTime: 60 });
    }
    setState(obj);
  };

  const toggleClickSendCode = () => {
    setState({ visibleSendCode: !visibleSendCode });
  };

  const onClickVerify = async () => {
    setState({ loading: true });
    const res = await mutationVerifiedEmail(verifycationCode);
    const obj = { loading: false };
    if (res.isSuccess) {
      auth.setDatalogin({ ...auth.getDataLogin(), isVerified: true });
      onClickCancel();
    }
    setState(obj);
  };

  return (
    <div className={classnames("verify-account", className)}>
      <div className="verify-account-wrapper">
        <div className="verify-account-editing">
          <div className="flex">
            <span className="b mr-4">Email:</span>
            <span>{props.email}</span>
          </div>

          <ReactCodeInput
            autoFocus={false}
            values={verifycationCode.split()}
            type="number"
            className={`mt-16 ${invalidCode ? "invalid-code" : ""}`}
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
            <Button
              type="link"
              className="mt-16"
              disabled={countingTime !== 0}
              onClick={toggleClickSendCode}
            >
              {`Resend code ${countingTime !== 0 ? countingTime : ""}`}
            </Button>
          </div>
        </div>
      </div>

      <div className="handle-user-ui-btns">
        <Button onClick={onClickCancel} disabled={loading}>
          Cancel
        </Button>

        <Button
          type="primary"
          onClick={onClickVerify}
          loading={loading}
          disabled={verifycationCode.length !== 6}
          className="ml-32"
        >
          Verify
        </Button>
      </div>
      <ConfirmModal
        type="SEND_VERIFY_CODE"
        toggleClick={toggleClickSendCode}
        onClick={onClickSendCode}
        visible={visibleSendCode}
      ></ConfirmModal>
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
