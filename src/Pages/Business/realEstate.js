import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { } from 'antd';
import { useMergeState } from '../../Helpers/customHooks';

const RealEstate = (props) => {
  const [state, setState] = useMergeState({
    data: [],
  });
  const { className } = props;
  return (
    <div className={classnames('-wrapper', className)}>
      <span>my component</span>
    </div>
  );
};
RealEstate.defaultProps = {
  className: '',
};
RealEstate.propTypes = {
  className: PropTypes.string,
};

export default RealEstate;
