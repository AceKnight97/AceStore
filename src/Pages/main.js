import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import { PAGE_MANAGER } from '../Constants';
import reloadPageRequest from '../Redux/Actions/reload';
import Home from './Home';
import LightNovel from './LightNovel';
import MyCV from './MyCV';

const Main = (props) => {
  useEffect(() => {
    window.onbeforeunload = () => {};
    window.onload = () => {
      props.reloadPageRequest();
    };
    // window.onload = () => {
    //   props.reloadPageRequest();
    // };
  }, []);
  return (
    <main className='div-root'>
      <Router>
        <Switch>
          <Route path='/acestore' name='My CV' component={MyCV} />
          <Route path='/home' name='Home' component={Home} />
          <Route path='/light-novel' name='My Light Novel' component={LightNovel} />

          <Redirect path='/' to={{ pathname: '/acestore' }} />
        </Switch>
      </Router>
    </main>
  );
};

Main.defaultProps = {};

Main.propTypes = {
  reloadPageRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
});

const mapDispatchToProps = {
  reloadPageRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
