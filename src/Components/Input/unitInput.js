import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import InputCT from './inputCT';
import SelectCT from './selectCT';


const UnitInput = (props) => {
  const {
    className, title, placeholder, disabled, data,
    onChangeUnit, unitValue, value,
    onChange, name, supName,
  } = props;

  return (
    <div className={classnames('unit-input-wrapper', className)}>

      <div className="unit-input-left">
        <InputCT
          name={name}
          title={title}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          type="NUMBER"
        />
      </div>

      <div className="unit-input-right">
        <SelectCT
          name={supName}
          data={data}
          value={unitValue}
          // defaultValue={data[0]}
          onChange={onChangeUnit}
          showSearch={false}
        />
      </div>

    </div>
  );
};
UnitInput.defaultProps = {
  className: '',
  title: '',
  onChange: () => {},
  onChangeUnit: () => {},
  placeholder: '',
  disabled: false,
  data: ['inch', 'cm'],
  unitValue: undefined,
  value: undefined,
  name: '',
  supName: '',
};
UnitInput.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
  onChangeUnit: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.string),
  unitValue: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  supName: PropTypes.string,
};

export default UnitInput;
