import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { } from 'antd';
import { useMergeState } from '../../../../Helpers/customHooks';
import logo from '../../../../Images/Pages/Home/acestore-logo.jpg';


const HomeHeader = (props) => {
  const [state, setState] = useMergeState({
    data: [],
  });
  const { className } = props;
  const onChange = (key, value) => {
    setState({ [key]: value });
  }
  return (
    <div className={classnames('home-header', className)}>
      <img src={logo} alt='Logo' />
    </div>
  );
};
HomeHeader.defaultProps = {
  className: '',
};
HomeHeader.propTypes = {
  className: PropTypes.string,
};

export default HomeHeader;