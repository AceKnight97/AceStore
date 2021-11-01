import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { } from 'antd';
import { useMergeState } from '../../Helpers/customHooks';
import HomeHeader from '../../Components/Pages/Home/HomeHeader';
import HomeFooter from '../../Components/Pages/Home/HomeFooter';
import HomeBody from '../../Components/Pages/Home/HomeBody';


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
      <HomeHeader />

      <HomeBody />



      <HomeFooter />
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