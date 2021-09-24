import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { } from 'antd';
import { useMergeState } from '../../Helpers/customHooks';


const Home = (props) => {
  const [state, setState] = useMergeState({
    data: [],
  });
  const { className } = props;
  const onChange = (key, value) => {
    setState({ [key]: value });
  }
  return (
    <div className={classnames('home', className)}>
      <span>my component 123 3241231</span>
    </div>
  );
};
Home.defaultProps = {
  className: '',
};
Home.propTypes = {
  className: PropTypes.string,
};

export default Home;