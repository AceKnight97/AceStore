import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import {} from "antd";
import "./_supergraphic.scss";
import { useMergeState } from "../../../Helpers/customHooks";
import boschLogo from '../../../Images/bosch-logo-new-flat.png'

const Supergraphic = (props) => {
  const [state, setState] = useMergeState({
    data: [],
  });
  const { className } = props;
  const onChange = (key, value) => {
    setState({ [key]: value });
  };
  return (
    <div >
      <div className={classnames("supergraphic", className)}></div>
      <div className="bosch-header">
        <img src={boschLogo} alt="Bosch ic" className="bosch-header-logo"></img>
      </div>
  </div>
  );
};
Supergraphic.defaultProps = {
  className: "",
};
Supergraphic.propTypes = {
  className: PropTypes.string,
};

export default Supergraphic;
