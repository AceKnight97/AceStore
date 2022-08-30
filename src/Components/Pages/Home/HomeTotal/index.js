import { Button } from "antd";
import classnames from "classnames";
import $ from "jquery";
import PropTypes from "prop-types";
import React, { useMemo, useRef } from "react";
import { findDOMNode } from "react-dom";
import { getPrice } from "../../../../Helpers";
import { useMergeState } from "../../../../Helpers/customHooks";
import expandIc from "../../../../Images/Icons/expand.png";
import "./_home-total.scss";

const HomeTotal = (props) => {
  const debounceRef = useRef(undefined);
  const toggleRef = useRef(undefined);
  const [state, setState] = useMergeState({
    isExpanded: true,
    isDisNone: false,
  });
  const {
    className,
    total,
    onClickBuy,
    onClickReset,
    isDisabledResetFilter,
    onClickResetFilter,
  } = props;

  const { isExpanded, isDisNone } = state;

  const orderHere = () => {
    onClickBuy(true);
  };

  const onClickBuyNow = () => {
    onClickBuy(false);
  };

  const onToggleExpand = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      const el = findDOMNode(toggleRef.current);
      if (el) {
        $(el).slideToggle("slow");
        const time = isDisNone ? 0 : 600;
        setTimeout(() => {
          setState({ isDisNone: !isDisNone });
        }, time);
      }
    }, 200);
  };

  const formatedTotal = useMemo(() => {
    return getPrice(total, undefined, "");
  }, [total]);

  return (
    <div className={classnames("home-total", className)}>
      <div
        className={classnames(
          "home-total-main"
          // isExpanded ? "animation-expanded" : "animation-un-expanded",
          // isDisNone && "dis-none"
        )}
        ref={toggleRef}
      >
        <div className="fr-sb">
          <Button
            type="primary"
            className="mr-16"
            danger
            disabled={isDisabledResetFilter}
            onClick={onClickResetFilter}
          >
            Reset filter
          </Button>

          <Button
            type="primary"
            danger
            onClick={onClickReset}
            disabled={!total}
          >
            Reset Cart
          </Button>
        </div>

        <div className="home-total-price">{formatedTotal}</div>

        <div className="fr-sb">
          <Button
            block
            type="primary"
            onClick={onClickBuyNow}
            disabled={!total}
          >
            Take away
          </Button>
          <Button
            type="primary"
            onClick={orderHere}
            disabled={!total}
            className="ml-16"
          >
            Order here
          </Button>
        </div>
      </div>

      <button
        className={classnames(
          "home-total-expand-btn",
          isDisNone && "new-possition"
        )}
        onClick={onToggleExpand}
      >
        <img src={expandIc} alt="Expand ic" />
      </button>
    </div>
  );
};
HomeTotal.defaultProps = {
  className: "",
  total: 0,
  onClickBuy: () => {},
  onClickReset: () => {},
  onClickResetFilter: () => {},
  isDisabledResetFilter: false,
};
HomeTotal.propTypes = {
  className: PropTypes.string,
  total: PropTypes.number,
  onClickBuy: PropTypes.func,
  onClickReset: PropTypes.func,
  onClickResetFilter: PropTypes.func,
  isDisabledResetFilter: PropTypes.bool,
};

export default HomeTotal;
