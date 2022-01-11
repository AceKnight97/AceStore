import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import {} from "antd";
import { useMergeState } from "../../../../Helpers/customHooks";
import "./_filter-block.scss";
import InputCT from "../../../Inputs/InputCT";
import starIc from "../../../../Images/Pages/Home/star.svg";
import starInactiveIc from "../../../../Images/Pages/Home/star-inactive.svg";
import SelectCT from "../../../Inputs/SelectCT";

const FilterBlock = (props) => {
  const [state, setState] = useMergeState({});
  const {
    className,
    onChange,
    value1,
    value2,
    name1,
    name2,
    placeholder1,
    placeholder2,
    title1,
    title2,
    type,
    stars,
  } = props;
  return (
    <div className={classnames("filter-block", className)}>
      <div className="flex">
        <div className="filter-block-title">Search:</div>
        <InputCT
          name={name1}
          value={value1}
          onChange={onChange}
          placeholder={placeholder1}
          className=""
        />
        <div className="filter-block-star">Star:</div>
        {_.map(_.range(stars), (x) => (
          <button className="bas-btn" key={x}>
            <img src={starIc} alt="Star ic" />
          </button>
        ))}
        {_.map(_.range(5 - stars), (x, i) => (
          <button className="bas-btn" key={x}>
            <img src={starInactiveIc} alt="Star inactive ic" />
          </button>
        ))}
      </div>
      <div className="filter-block-row">
        <SelectCT
          name={name1}
          // value={value1}
          onChange={onChange}
          title="Kind of food"
        />
        <SelectCT
          name={name1}
          // value={value1}
          onChange={onChange}
          placeholder={placeholder1}
          title="Min price"
          className="ml-48"
          type="NUMBER"
        />
        <SelectCT
          name={name1}
          // value={value1}
          onChange={onChange}
          placeholder={placeholder1}
          title="Max price"
          className="ml-48"
          type="NUMBER"
        />
      </div>
    </div>
  );
};
FilterBlock.defaultProps = {
  className: "",
  value1: "",
  value2: "",
  name1: "",
  name2: "",
  placeholder1: undefined,
  placeholder2: undefined,
  title1: "",
  title2: "",
  type: "",
  stars: 3,
};
FilterBlock.propTypes = {
  className: PropTypes.string,
  value1: PropTypes.string,
  value2: PropTypes.string,
  name1: PropTypes.string,
  name2: PropTypes.string,
  placeholder1: PropTypes.string,
  placeholder2: PropTypes.string,
  title1: PropTypes.string,
  title2: PropTypes.string,
  stars: PropTypes.number,
};

export default FilterBlock;
