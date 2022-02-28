import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import HomeBody from "../../Components/Pages/Home/HomeBody";
import HomeFooter from "../../Components/Pages/Home/HomeFooter";
import HomeHeader from "../../Components/Pages/Home/HomeHeader";

const Home = (props) => {
  const { className } = props;
  return (
    <div className={classnames("home", className)}>
      <HomeHeader />

      <HomeBody />

      <HomeFooter />
    </div>
  );
};
Home.defaultProps = {
  className: "",
};
Home.propTypes = {
  className: PropTypes.string,
};

export default Home;
