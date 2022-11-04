import { Collapse } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useMemo, useRef } from "react";
import { MIN_MAX_PRICE } from "../../../../Constants/home";
import auth from "../../../../Helpers/auth";
import {
  useMergeState,
  useUpdateEffect
} from "../../../../Helpers/customHooks";
import { isEqual } from "../../../../Utils";
import InputCT from "../../../Inputs/InputCT";
import SelectCT from "../../../Inputs/SelectCT";
import DisplayRating from "../../../UI/DisplayRating";
import HomeTotal from "../HomeTotal";
import "./_filter-block.scss";

const { Panel } = Collapse;

const DEFAULT_STATE = {
  searchName: "",
  rating: 0,
  kind: "All",
  minPrice: undefined,
  maxPrice: undefined,
};

const FilterBlock = (props) => {
  const filterRef = useRef(undefined);
  const [state, setState] = useMergeState({
    ...DEFAULT_STATE,
  });
  const { className, onFilterFood, } = props;
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

  const onClickResetFilter = () => {
    setState({ ...DEFAULT_STATE });
  };

  useUpdateEffect(() => {
    if (filterRef.current) {
      clearTimeout(filterRef.current);
    }
    filterRef.current = setTimeout(() => {
      onFilterFood(state);
    }, 200);
  }, [searchName, rating, kind, minPrice, maxPrice]);

  const minPriceData = useMemo(() => {
    return MIN_MAX_PRICE.filter((x) => (maxPrice ? x <= maxPrice : true));
  }, [maxPrice]);

  const maxPriceData = useMemo(() => {
    return MIN_MAX_PRICE.filter((x) => (minPrice ? x >= minPrice : true));
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

      <Collapse defaultActiveKey={['1']} onChange={onChange} className="filter-block-toggle-exp" >
        <Panel header="Shopbox" key="1" showArrow={false} className="filter-block-toggle-exp-header" >
          <HomeTotal
            total={props.total}
            isDisabledResetFilter={isEqual(DEFAULT_STATE, state)}
            onClickReset={props.onClickReset}
            onClickBuy={props.onClickBuy}
            onClickResetFilter={onClickResetFilter}
          />
        </Panel>
      </Collapse>
    </div>
  );
};
FilterBlock.defaultProps = {
  className: "",
  onFilterFood: () => { },
  total: 0,
  onClickBuy: () => { },
  onClickReset: () => { },
};
FilterBlock.propTypes = {
  className: PropTypes.string,
  onFilterFood: PropTypes.func,
  total: PropTypes.number,
  onClickBuy: PropTypes.func,
  onClickReset: PropTypes.func,
};

export default FilterBlock;
