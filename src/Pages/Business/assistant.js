import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { } from 'antd';
import { useMergeState } from '../../Helpers/customHooks';

const Assistant = (props) => {
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
Assistant.defaultProps = {
  className: '',
};
Assistant.propTypes = {
  className: PropTypes.string,
};

export default Assistant;
