import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, TimePicker } from 'antd';
import classnames from 'classnames';
import moment from 'moment';

import InputTitle from './inputTitle';

const DatepickerCT = (props) => {
  const {
    className, title, placeholder, format, value, name, suffixIcon, type,
    disabledDate, disabled,
  } = props;

  const onChange = (date) => {
    props.onChange(name, date);
  };

  let disabledDateCT;
  switch (disabledDate) {
    case 'PAST': {
      disabledDateCT = (current) => current > moment().endOf('day');
      break;
    }
    case 'FUTURE': {
      disabledDateCT = (current) => current <= moment().endOf('day');
      break;
    }
    default: {
      break;
    }
  }

  return (
    <div className={classnames('datepicker-ct-wrapper', className)}>
      <InputTitle title={title} />

      {
        type === 'TIME'
          ? (
            <TimePicker
              disabled={disabled}
              getPopupContainer={(trigger) => trigger.parentElement}
              // inputReadOnly
              suffixIcon={suffixIcon}
              placeholder={placeholder}
              onChange={onChange}
              format={format}
              value={typeof (value) === 'string' && moment(value).isValid() ? moment(value) : value || undefined}
              disabledDate={disabledDateCT}
            />
          ) : (
            <DatePicker
              disabled={disabled}
              getPopupContainer={(trigger) => trigger.parentElement}
              // inputReadOnly
              suffixIcon={suffixIcon}
              placeholder={placeholder}
              onChange={onChange}
              format={format}
              value={typeof (value) === 'string' && moment(value).isValid() ? moment(value) : value || undefined}
              disabledDate={disabledDateCT}
            />
          )
      }
    </div>
  );
};

DatepickerCT.defaultProps = {
  className: undefined,
  format: 'MM/DD/YYYY',
  title: '',
  placeholder: 'Select date',
  onChange: () => { },
  value: undefined,
  name: '',
  disabledDate: undefined,
  suffixIcon: undefined,
  type: 'DATE',
  disabled: false,
};

DatepickerCT.propTypes = {
  className: PropTypes.string,
  format: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
  name: PropTypes.string,
  disabledDate: PropTypes.string,
  suffixIcon: PropTypes.shape(),
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default DatepickerCT;
