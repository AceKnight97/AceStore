import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { useMergeState } from "../../Helpers/customHooks";

const MyCompo = (props) => {
  const [state, setState] = useMergeState({
    data: [],
  });
  const { className } = props;
  const onChange = (key, value) => {
    setState({ [key]: value });
  };
  return (
    <div className={classnames("-wrapper", className)}>
      <span>my component</span>
    </div>
  );
};
MyCompo.defaultProps = {
  className: "",
};
MyCompo.propTypes = {
  className: PropTypes.string,
};

export default MyCompo;
