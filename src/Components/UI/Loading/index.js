import { Spin } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import "./_loading.scss";

const Loading = (props) => {
  const { className } = props;
  return (
    <div className={classnames("loading", className)}>
      {/*<div className="loader-gif"></div>*/}
      <Spin />
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
