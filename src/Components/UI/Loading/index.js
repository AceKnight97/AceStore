import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import {} from "antd";
import { useMergeState } from "../../../Helpers/customHooks";
import "./_loading.scss";

const Loading = (props) => {
  const [state, setState] = useMergeState({
    data: [],
  });
  const { className } = props;
  const onChange = (key, value) => {
    setState({ [key]: value });
  };
  return (
    <div className={classnames("loading", className)}>
      <div class="loader-gif"></div>
    </div>
  );
};
Loading.defaultProps = {
  className: "",
};
Loading.propTypes = {
  className: PropTypes.string,
};

export default Loading;
