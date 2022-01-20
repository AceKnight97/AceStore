import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";

import "./_display-rating.scss";
import starIc from "../../../Images/Pages/Home/star.svg";
import starInactiveIc from "../../../Images/Pages/Home/star-inactive.svg";

const DisplayRating = (props) => {
  const { className, rating, onClick, isButton } = props;
  return (
    <div className={classnames("display-rating", className)}>
      {isButton ? (
        <>
          {_.map(_.range(rating), (x, i) => (
            <button className="bas-btn" key={x} onClick={() => onClick(i + 1)}>
              <img src={starIc} alt="Star ic" />
            </button>
          ))}
          {_.map(_.range(5 - rating), (x, i) => (
            <button
              className="bas-btn"
              key={x}
              onClick={() => onClick(rating + i + 1)}
            >
              <img src={starInactiveIc} alt="Star inactive ic" />
            </button>
          ))}
        </>
      ) : (
        <>
          {_.map(_.range(rating), (x) => (
            <img src={starIc} alt="Star ic" key={x} className="mr-2" />
          ))}
          {_.map(_.range(5 - rating), (x, i) => (
            <img
              src={starInactiveIc}
              alt="Star ic"
              key={i}
              className={4 - rating !== x ? "mr-2" : ""}
            />
          ))}
        </>
      )}
    </div>
  );
};
DisplayRating.defaultProps = {
  className: "",
  onClick: () => {},
  rating: 1,
  isButton: false,
};
DisplayRating.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  rating: PropTypes.number,
  isButton: PropTypes.bool,
};

export default DisplayRating;
