// import boschLogo from "../../../Images/bosch-logo-new-flat.png";
import { RightOutlined } from "@ant-design/icons";
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useMergeState } from "../../../Helpers/customHooks";
import "./_supergraphic.scss";

const Supergraphic = (props) => {
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const [state, setState] = useMergeState({});
  const { className } = props;
  // useEffect(() => {}, []);
  const isAtHome = pathname.includes("/acestore");

  const onClickHome = () => {
    if (isAtHome) {
      return;
    }
    history.push("/acestore");
  };

  const renderLocationTitle = () => {
    // console.log({ location });
    let title = "";
    switch (pathname) {
      case "/food-order":
        title = "Food Order";
        break;
      case "/history":
        title = "Order History";
        break;
      case "/user":
        title = "User";
        break;
      default:
        break;
    }
    return (
      <div className="bosch-header-title">
        <NavLink
          to="/acestore"
          onClick={onClickHome}
          // className={isAtHome ? "cur-not-allowed" : ""}
        >
          Home
        </NavLink>
        {title ? (
          <>
            <RightOutlined />
            <span>{title}</span>
          </>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <div className={classnames("supergraphic", className)}></div>
      <div className="bosch-header">
        <div className="flex">
          {/* <img
            src={boschLogo}
            alt="Bosch ic"
            className="bosch-header-logo"
          ></img> */}
          {/* <div className="supergraphic-title">
            Acestore
          </div> */}
          {renderLocationTitle()}
        </div>
        <div className="bosch-header-group">Acestore</div>
      </div>
      {!isAtHome && (
        <NavLink to="/acestore" className="not-home-back-btn">
          Go back
        </NavLink>
      )}
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
