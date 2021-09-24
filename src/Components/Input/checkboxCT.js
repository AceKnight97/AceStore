import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import DatepickerCT from './datepickerCT';
import InputCT from './inputCT';
import SelectCT from './selectCT';
import InputTitle from './inputTitle';
import AsyncSelectInput from './asyncSelect';

const CheckboxCT = (props) => {
  const {
    className, data, type, disabled, isCheck,
    placeholder, suffix, title,
    value, selectData, name, mode,
    checkboxClassName, supName, onChangeInput, supDisabled,
  } = props;

  const onChange = (e) => {
    props.onChange(name, e.target.checked);
  };

  return (
    <div className={classnames('checkbox-ct-wrapper', className)}>
      <InputTitle title={title} className="checkbox-ct-title" />

      <div className={classnames('checkbox-ct-main', checkboxClassName)}>
        <Checkbox
          name={name}
          checked={isCheck}
          disabled={disabled}
          onChange={onChange}
        >
          {data}
        </Checkbox>

        {suffix ? (
          <div className="checkbox-suffix">
            <span>{suffix}</span>
          </div>
        ) : null}
      </div>

      {type === 'DATE' && isCheck
        ? (
          <DatepickerCT
            disabled={supDisabled}
            name={supName}
            className="date-sub-component"
            placeholder={placeholder}
            onChange={onChangeInput}
          />
        ) : null}

      {type === 'TEXTAREA' && isCheck
        ? (
          <InputCT
            disabled={supDisabled}
            name={supName}
            type="TEXTAREA"
            className="date-sub-component"
            placeholder={placeholder}
            onChange={onChangeInput}
          />
        ) : null}

      {type === 'SELECT'
        ? (
          <SelectCT
            disabled={supDisabled}
            name={supName}
            mode={mode}
            suffixIcon={(<SearchOutlined />)}
            className="mt8"
            placeholder={placeholder}
            value={value}
            data={selectData}
            onChange={onChangeInput}
            isValueOutside
          // suffixIcon={() => <SearchOutlined />}
          // menuItemSelectedIcon={() => <SearchOutlined />}
          // title={}
          // isValueOutside
          />
        ) : null}

      {
        type === 'ASYNC_SELECT' && (
          <AsyncSelectInput
            disabled={supDisabled}
            name={supName}
            className="mt8"
            placeholder={props.placeholder}
            defaultValue={props.value}
            onChange={props.onChangeInput}
            isValueOutside={props.isValueOutside}
            isSearchable={props.isSearchable}
            loadOptions={props.loadOptions}
          />
        )
      }
    </div>
  );
};

CheckboxCT.defaultProps = {
  className: undefined,
  title: '',
  data: '',
  onChange: () => { },
  onChangeInput: () => { },
  isCheck: false,
  disabled: false,
  supDisabled: false,
  type: '',
  placeholder: '',
  suffix: '',
  value: [],
  selectData: [],
  name: '',
  supName: '',
  mode: undefined,
  checkboxClassName: undefined,
  isValueOutside: false,
  isSearchable: false,
  loadOptions: () => { },
};

CheckboxCT.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.string,
  onChange: PropTypes.func,
  onChangeInput: PropTypes.func,
  isCheck: PropTypes.bool,
  disabled: PropTypes.bool,
  supDisabled: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ])),
  selectData: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  supName: PropTypes.string,
  mode: PropTypes.string,
  checkboxClassName: PropTypes.string,
  isValueOutside: PropTypes.bool,
  isSearchable: PropTypes.bool,
  loadOptions: PropTypes.func,
};

export default CheckboxCT;
