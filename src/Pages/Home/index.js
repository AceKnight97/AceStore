import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import {} from "antd";
import { useMergeState } from "../../Helpers/customHooks";
import HomeHeader from "../../Components/Pages/Home/HomeHeader";
import HomeFooter from "../../Components/Pages/Home/HomeFooter";
import HomeBody from "../../Components/Pages/Home/HomeBody";
import fetchMasterData from "../../Apollo/Functions/Fetch/fetchMasterData";
import auth from "../../Helpers/auth";

const Home = (props) => {
  const [state, setState] = useMergeState({
    data: [],
  });
  const { className } = props;
  const callApi = async () => {
    const masterdata = await fetchMasterData();
    auth.setMasterData(masterdata);
    // console.log({ masterdata });
  };
  useEffect(() => {
    callApi();
  }, []);
  const onChange = (key, value) => {
    setState({ [key]: value });
  };
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
