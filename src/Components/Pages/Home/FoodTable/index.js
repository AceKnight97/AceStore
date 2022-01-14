import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import $ from "jquery";
import { Button } from "antd";
import FoodCard from "../FoodCard";
import { useMergeState } from "../../../../Helpers/customHooks";
import { findDOMNode } from "react-dom";

const FoodTable = (props) => {
  const toggleRef = useRef(undefined);
  const debounceRef = useRef(undefined);
  const [state, setState] = useMergeState({
    isShow: props.isShow,
  });
  const { className, data, title, onChangeCart } = props;
  const { isShow } = state;
  useEffect(() => {
    if (!isShow) {
      const el = findDOMNode(toggleRef.current);
      $(el).slideUp("slow");
    }
  }, []);
  const toggleShow = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      const el = findDOMNode(toggleRef.current);
      if (el) {
        $(el).slideToggle("slow");
      }
      setState({ isShow: !isShow });
    }, 200);
  };

  // const  = (isBuy = false, itemData = {}) => {
  //   console.log({ isBuy, itemData });
  // }
  // console.log({ title });
  // if (title === "null") {
  //   console.log(data);
  // }

  return (
    <div className={classnames("food-table", className)}>
      <div className="food-table-title">
        <span>{title}</span>
      </div>
      <div ref={toggleRef}>
        <div className="food-table-wrap">
          {_.map(data, (x, i) => (
            <FoodCard
              key={i}
              {...x}
              onChangeCart={(item) => onChangeCart(item, title)}
              className="mr-24 mt-24"
            />
          ))}
        </div>
      </div>

      <div className="food-table-ender" />
      <Button type="link" onClick={toggleShow} className="food-table-show-btn">
        {isShow ? "Hide" : "Show"}
      </Button>
    </div>
  );
};
FoodTable.defaultProps = {
  className: "",
  data: [],
  title: "",
  onChangeCart: () => {},
  isShow: false,
};
FoodTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  title: PropTypes.string,
  onChangeCart: PropTypes.func,
  isShow: PropTypes.bool,
};

export default FoodTable;
