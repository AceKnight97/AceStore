import React, { useEffect } from "react";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";

import "./_supergraphic.scss";
import { useMergeState, useUpdateEffect } from "../../../Helpers/customHooks";
import boschLogo from "../../../Images/bosch-logo-new-flat.png";
import { RightOutlined } from "@ant-design/icons";

const Supergraphic = (props) => {
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const [state, setState] = useMergeState({});
  const { className } = props;
  useEffect(() => {}, []);

  const onClickHome = (e) => {
    history.push("/retail-store");
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
        <NavLink to="/retail-store" onClick={onClickHome}>
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
          <img
            src={boschLogo}
            alt="Bosch ic"
            className="bosch-header-logo"
          ></img>
          {renderLocationTitle()}
        </div>
        <div className="bosch-header-group">Canteen - Group 4</div>
      </div>
      {pathname !== "/retail-store" && (
        <NavLink to="/retail-store" className="not-home-back-btn">
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
