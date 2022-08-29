import { Button } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { getPrice } from "../../../../Helpers";
import { useMergeState } from "../../../../Helpers/customHooks";
import expandIc from "../../../../Images/Icons/expand.png";
import "./_home-total.scss";

const HomeTotal = (props) => {
  const [state, setState] = useMergeState({
    isExpanded: true,
  });
  const {
    className,
    total,
    onClickBuy,
    onClickReset,
    isDisabledResetFilter,
    onClickResetFilter,
  } = props;

  const { isExpanded } = state;

  const orderHere = () => {
    onClickBuy(true);
  };

  const onClickBuyNow = () => {
    onClickBuy(false);
  };

  const onToggleExpand = () => {
    setState({ isExpanded: !isExpanded });
  };

  const formatedTotal = useMemo(() => {
    return getPrice(total, undefined, "");
  }, [total]);

  return (
    <div
      className={classnames(
        "home-total",
        !isExpanded && "animation-un-expanded",
        className
      )}
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

        <Button type="primary" danger onClick={onClickReset} disabled={!total}>
          Reset Cart
        </Button>
      </div>

      <div className="home-total-price">{formatedTotal}</div>

      <div className="fr-sb">
        <Button block type="primary" onClick={onClickBuyNow} disabled={!total}>
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

      <button className="home-total-expand-btn" onClick={onToggleExpand}>
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
