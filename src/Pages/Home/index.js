import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import subscribeNewFoodOrders from "../../Apollo/Functions/Subscribe/subscribeNewFoodOrders";
import HomeBody from "../../Components/Pages/Home/HomeBody";
import HomeFooter from "../../Components/Pages/Home/HomeFooter";
import HomeHeader from "../../Components/Pages/Home/HomeHeader";

const Home = (props) => {
  const { className } = props;
  return (
    <div className={classnames("home", className)}>
      <HomeHeader />
      {/* {subscribeNewFoodOrders()} */}

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
