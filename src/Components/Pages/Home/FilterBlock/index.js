import React, { useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";

import {
  useMergeState,
  useUpdateEffect,
} from "../../../../Helpers/customHooks";
import "./_filter-block.scss";
import InputCT from "../../../Inputs/InputCT";
import starIc from "../../../../Images/Pages/Home/star.svg";
import starInactiveIc from "../../../../Images/Pages/Home/star-inactive.svg";
import SelectCT from "../../../Inputs/SelectCT";
import { MIN_MAX_PRICE } from "../../../../Constants/home";
import auth from "../../../../Helpers/auth";
import DisplayRating from "../../../UI/DisplayRating";

const FilterBlock = (props) => {
  const filterRef = useRef(undefined);
  const [state, setState] = useMergeState({
    searchName: "",
    rating: 0,
    kind: undefined,
    minPrice: undefined,
    maxPrice: undefined,
  });
  const { className, onFilterFood } = props;
  const onChange = (key, value) => {
    setState({ [key]: value });
  };

  const onChangeStar = (rating = 0) => {
    if (rating === state.rating) {
      setState({ rating: 0 });
      return;
    }
    setState({ rating });
  };
  const { searchName, rating, kind, minPrice, maxPrice } = state;

  useUpdateEffect(() => {
    if (filterRef.current) {
      clearTimeout(filterRef.current);
    }
    filterRef.current = setTimeout(() => {
      onFilterFood(state);
    }, 200);
  }, [searchName, rating, kind, minPrice, maxPrice]);

  return (
    <div className={classnames("filter-block", className)}>
      <div className="flex">
        <div className="filter-block-title">Search:</div>
        <InputCT
          name="searchName"
          value={searchName}
          onChange={onChange}
          className="filter-block-search"
        />
        <div className="filter-block-star">Stars:</div>

        <DisplayRating
          rating={rating}
          isButton
          onClick={onChangeStar}
          className="filter-block-star-dis"
        ></DisplayRating>
        {/*
        <Button
          type="link"
          // onClick={onClickUsername}
          className="home-header-username-btn"
        >
          {username}
        </Button>
        */}
      </div>
      <div className="filter-block-row">
        <SelectCT
          name="kind"
          value={kind}
          onChange={onChange}
          className="w-160"
          title="Kind of food:"
          data={auth.getKindOfFood() || []}
        />
        <SelectCT
          name="minPrice"
          value={minPrice}
          onChange={onChange}
          title="Min price:"
          className="ml-48 w-160"
          type="NUMBER"
          data={_.filter(MIN_MAX_PRICE, (x) =>
            maxPrice ? x < maxPrice : true
          )}
        />
        <SelectCT
          name="maxPrice"
          value={maxPrice}
          onChange={onChange}
          title="Max price:"
          className="ml-48 w-160"
          type="NUMBER"
          data={_.filter(MIN_MAX_PRICE, (x) =>
            minPrice ? x > minPrice : true
          )}
        />
      </div>
    </div>
  );
};
FilterBlock.defaultProps = {
  className: "",
  onFilterFood: () => {},
};
FilterBlock.propTypes = {
  className: PropTypes.string,
  onFilterFood: PropTypes.func,
};

export default FilterBlock;
