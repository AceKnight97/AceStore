import classnames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useCallback, useMemo, useRef } from "react";
import { MIN_MAX_PRICE } from "../../../../Constants/home";
import auth from "../../../../Helpers/auth";
import {
  useMergeState,
  useUpdateEffect,
} from "../../../../Helpers/customHooks";
import InputCT from "../../../Inputs/InputCT";
import SelectCT from "../../../Inputs/SelectCT";
import DisplayRating from "../../../UI/DisplayRating";
import HomeTotal from "../HomeTotal";
import "./_filter-block.scss";

const FilterBlock = (props) => {
  const filterRef = useRef(undefined);
  const [state, setState] = useMergeState({
    searchName: "",
    rating: 0,
    kind: "All",
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

  const minPriceData = useMemo(() => {
    return _.filter(MIN_MAX_PRICE, (x) => (maxPrice ? x <= maxPrice : true));
  }, [maxPrice]);

  const maxPriceData = useMemo(() => {
    return _.filter(MIN_MAX_PRICE, (x) => (minPrice ? x >= minPrice : true));
  }, [minPrice]);

  return (
    <div className={classnames("filter-block", className)}>
      <InputCT
        title="Search:"
        name="searchName"
        value={searchName}
        onChange={onChange}
        className="filter-block-search"
      />
      <SelectCT
        className="filter-block-select"
        name="kind"
        value={kind}
        onChange={onChange}
        title="Kind of food:"
        data={["All", ...auth.getKindOfFood()]}
      />
      <SelectCT
        className="filter-block-select"
        name="minPrice"
        value={minPrice}
        onChange={onChange}
        title="Min price:"
        type="NUMBER"
        data={minPriceData}
      />
      <SelectCT
        className="filter-block-select"
        name="maxPrice"
        value={maxPrice}
        onChange={onChange}
        title="Max price:"
        type="NUMBER"
        data={maxPriceData}
      />
      <DisplayRating
        title="Stars:"
        rating={rating}
        isButton
        onClick={onChangeStar}
        className="filter-block-star-dis"
      ></DisplayRating>
      <HomeTotal
        className="filter-block-total"
        total={props.total}
        onClickReset={props.onClickReset}
        onClickBuy={props.onClickBuy}
      />
    </div>
  );
};
FilterBlock.defaultProps = {
  className: "",
  onFilterFood: () => {},
  total: 0,
  onClickBuy: () => {},
  onClickReset: () => {},
};
FilterBlock.propTypes = {
  className: PropTypes.string,
  onFilterFood: PropTypes.func,
  total: PropTypes.number,
  onClickBuy: PropTypes.func,
  onClickReset: PropTypes.func,
};

export default FilterBlock;
