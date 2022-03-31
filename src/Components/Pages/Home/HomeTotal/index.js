import React, { useMemo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import { Button } from "antd";
import { getPrice } from "../../../../Helpers";

const HomeTotal = (props) => {
  const {
    className,
    total,
    onClickBuy,
    onClickReset,
    isDisabledResetFilter,
    onClickResetFilter,
  } = props;

  const orderHere = () => {
    onClickBuy(true);
  };

  const onClickBuyNow = () => {
    onClickBuy(false);
  };

  const formatedTotal = useMemo(() => {
    return getPrice(total, undefined, "");
  }, [total]);

  return (
    <div className={classnames("home-total", className)}>
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
