import { Select } from "antd";
import classnames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useRef } from "react";
// import Blue1BgRow from '../UI/blue1BgRow';
import InputTitle from "../InputTitle";
import "./_select-ct.scss";

const { Option } = Select;

const SelectCT = (props) => {
  const selectRef = useRef(undefined);

  const {
    className,
    placeholder,
    data,
    title, // onChange,
    showSearch,
    defaultValue,
    isValueOutside,
    value,
    mode,
    suffixIcon,
    name,
    disabled,
    isObject,
  } = props;

  const onChange = (value) => {
    props.onChange(name, value);
    selectRef.current.blur();
  };

  const onSearch = (value) => {
    props.onSearch(name, value);
  };

  return (
    <div
      className={classnames("select-ct-wrapper", className)}
      key={`select-ct-wrapper-${props.name}`}
    >
      <InputTitle title={title} />

      <Select
        getPopupContainer={(trigger) => trigger.parentElement}
        disabled={disabled}
        ref={selectRef}
        suffixIcon={suffixIcon}
        mode={mode}
        defaultValue={defaultValue}
        value={
          isValueOutside ? [] : isObject ? value?.label || undefined : value
        }
        showSearch={showSearch}
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={onChange}
        onSearch={showSearch ? onSearch : undefined}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {isObject
          ? _.map(data, (x, i) => (
              <Option key={i} value={x.label}>
                {x.label}
              </Option>
            ))
          : _.map(data, (x, i) => (
              <Option key={i} value={x}>
                {x}
              </Option>
            ))}
      </Select>

      {/* {
        isValueOutside && (
          <div className="select-ct-outside-res">
            {
              _.map(value, (x, i) => (
                <Blue1BgRow
                  key={i}
                  value={x}
                  className="mt8"
                  onClick={() => props.onChange(name, x)}
                  isShowDeleteButton
                />
              ))
            }
          </div>
        )
      } */}
    </div>
  );
};

SelectCT.defaultProps = {
  className: undefined,
  title: "",
  placeholder: "Select...",
  data: [],
  onChange: () => {},
  onSearch: () => {},
  showSearch: true,
  defaultValue: undefined,
  isValueOutside: false,
  mode: undefined, // 'tags', // or multiple
  value: [],
  suffixIcon: undefined,
  name: "",
  disabled: false,
  isObject: false,
};

SelectCT.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]),
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  showSearch: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
    PropTypes.number,
  ]),
  isValueOutside: PropTypes.bool,
  mode: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
    PropTypes.shape(),
    PropTypes.number,
  ]),
  suffixIcon: PropTypes.node,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  isObject: PropTypes.bool,
};

export default SelectCT;
