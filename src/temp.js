import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
tttriet19977@gmail.com
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
