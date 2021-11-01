import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { } from 'antd';
import { useMergeState } from '../../../../Helpers/customHooks';

const HomeBody = (props) => {
  const [state, setState] = useMergeState({
    data: [],
  });
  const { className } = props;
  const onChange = (key, value) => {
    setState({ [key]: value });
  }
  return (
    <div className={classnames('home-body', className)}>
      body
    </div>
  );
};
HomeBody.defaultProps = {
  className: '',
};
HomeBody.propTypes = {
  className: PropTypes.string,
};

export default HomeBody;