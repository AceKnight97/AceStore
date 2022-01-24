import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import { STATUS_ENUM } from "../../../Constants/home";
import "./_display-status.scss";

const DisplayStatus = (props) => {
  const { className, cell } = props;
  let color = "--pending";
  switch (cell) {
    case STATUS_ENUM[0]:
      color = "--pending";
      break;
    case STATUS_ENUM[1]:
      color = "--on-going";
      break;
    case STATUS_ENUM[2]:
      color = "--done";
      break;
    case STATUS_ENUM[3]:
      color = "--cancel";
      break;

    default:
      break;
  }
  return (
    <div className={classnames("display-status", className)}>
      <span className={color}>{cell}</span>
    </div>
  );
};
DisplayStatus.defaultProps = {
  className: "",
  cell: "",
};
DisplayStatus.propTypes = {
  className: PropTypes.string,
  cell: PropTypes.string,
};

export default DisplayStatus;
