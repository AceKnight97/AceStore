import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { } from 'antd';
import { useMergeState } from '../../../../Helpers/customHooks';
import logo from '../../../../Images/Pages/Home/acestore-logo.jpg';


const HomeFooter = (props) => {
  const [state, setState] = useMergeState({
    data: [],
  });
  const { className } = props;
  const onChange = (key, value) => {
    setState({ [key]: value });
  }
  return (
    <div className={classnames('home-footer', className)}>
      <span>Footer</span>
    </div>
  );
};
HomeFooter.defaultProps = {
  className: '',
};
HomeFooter.propTypes = {
  className: PropTypes.string,
};

export default HomeFooter;