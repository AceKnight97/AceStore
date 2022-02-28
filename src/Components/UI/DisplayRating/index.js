import classnames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import starInactiveIc from "../../../Images/Pages/Home/star-inactive.svg";
import starIc from "../../../Images/Pages/Home/star.svg";
import InputTitle from "../../Inputs/InputTitle";
import "./_display-rating.scss";

const DisplayRating = (props) => {
  const { className, rating, onClick, isButton, title } = props;
  const isDisabled = onClick === null;
  const curNotAllowed = isDisabled ? "cur-not-allowed" : "cur-pointer";
  return (
    <div className={classnames("display-rating", className)}>
      <InputTitle title={title}></InputTitle>
      <div className="flex">
        {isButton ? (
          <>
            {_.map(_.range(rating), (x, i) => (
              <button
                className={`bas-btn ${curNotAllowed}`}
                key={x}
                onClick={() => onClick(i + 1)}
                disabled={isDisabled}
              >
                <img src={starIc} alt="Star ic" />
              </button>
            ))}
            {_.map(_.range(5 - rating), (x, i) => (
              <button
                className={`bas-btn ${curNotAllowed}`}
                key={x}
                onClick={() => onClick(rating + i + 1)}
                disabled={isDisabled}
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
    </div>
  );
};
DisplayRating.defaultProps = {
  className: "",
  onClick: () => {},
  rating: 1,
  isButton: false,
  title: "",
};
DisplayRating.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  rating: PropTypes.number,
  isButton: PropTypes.bool,
  title: PropTypes.string,
};

export default DisplayRating;
