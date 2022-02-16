import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import { Button } from "antd";
// import { useMergeState } from '../../../../Helpers/customHooks';
import { getPrice } from "../../../../Helpers";

const HomeTotal = (props) => {
  // const [state, setState] = useMergeState({
  //   data: [],
  // });
  const { className, total, onClickBuy, onClickReset } = props;
  return (
    <div className={classnames("home-total", className)}>
      <div className="fr-sb">
        <div className="home-total-title">Total:</div>

        <Button type="primary" danger onClick={onClickReset} disabled={!total}>
          Reset cart
        </Button>
      </div>

      <div className="home-total-price">{getPrice(total, undefined, "")}</div>

      <Button block type="primary" onClick={onClickBuy} disabled={!total}>
        Buy now
      </Button>
    </div>
  );
};
HomeTotal.defaultProps = {
  className: "",
  total: 0,
  onClickBuy: () => {},
  onClickReset: () => {},
};
HomeTotal.propTypes = {
  className: PropTypes.string,
  total: PropTypes.number,
  onClickBuy: PropTypes.func,
  onClickReset: PropTypes.func,
};

export default HomeTotal;
