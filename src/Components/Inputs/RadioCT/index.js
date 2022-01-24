import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import InputTitle from "../InputTitle";
import { Radio, Drawer, Modal, Spin } from "antd";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";

const RadioCT = (props) => {
  const {
    className,
    data,
    type,
    title,
    value,
    textClass,
    onChange,
    titleClassName,
    radioItemClassName,
    name,
    isObj,
    loading,
    disabled,
  } = props;

  let itemMagrinTop = "mt18";
  let itemClassName = "";
  let titleClass = titleClassName;
  switch (type) {
    case "QUESTION":
      itemMagrinTop = "mt8";
      itemClassName = "question-item-normal";
      titleClass = "question-title";
      break;
    case "SCORE":
      itemClassName = "score-ct";
      itemMagrinTop = "";
      break;
    case "BIG":
      itemClassName = "big-margin";
      break;
    case "NONE":
      itemMagrinTop = "mt12";
      itemClassName = "fw-normal";
      break;
    default:
      break;
  }

  return (
    <div className={classnames("radio-ct", className)}>
      <InputTitle title={title} className={titleClass} />
      {loading ? (
        <div>
          <Spin indicator={<LoadingOutlined spin />} />
        </div>
      ) : (
        <Radio.Group
          onChange={(e) => onChange(name, e.target.value)}
          value={value}
          disabled={disabled}
        >
          {isObj
            ? _.map(data, (x, i) => (
                <div
                  key={i}
                  className={classnames("radio-item", radioItemClassName)}
                >
                  <Radio
                    value={x}
                    className={classnames(
                      itemMagrinTop,
                      itemClassName,
                      textClass,
                      x.content ? "fw-600" : ""
                    )}
                  >
                    {x.title}
                  </Radio>
                  {x.content ? (
                    <div className="radio-content">
                      <span>{x.content}</span>
                    </div>
                  ) : null}
                </div>
              ))
            : _.map(data, (x, i) => (
                <Radio key={x} value={x}>
                  {x}
                </Radio>
              ))}
        </Radio.Group>
      )}
    </div>
  );
};
RadioCT.defaultProps = {
  name: "",
  className: "",
  textClass: "",
  titleClassName: "",
  radioItemClassName: "",
  onChange: () => {},
  data: [],
  // itemMagrinTop: 'mt18',
  type: "SCORE",
  title: "",
  value: undefined,
  isObj: false,
  loading: false,
  disabled: false,
};
RadioCT.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  textClass: PropTypes.string,
  titleClassName: PropTypes.string,
  radioItemClassName: PropTypes.string,
  onChange: PropTypes.func,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]),
  // itemMagrinTop: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  title: PropTypes.string,
  type: PropTypes.string,
  isObj: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default RadioCT;
