import { Button, Table } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { getPrice } from "../../../Helpers";
import "./_admin-order-table.scss";
import $ from "jquery";
import moment from "moment";
import AntdTable from "../AntdTable";
import { getOrderTotal, mutationCloneOrder } from "./helper";
import ConfirmModal from "../../Modals/ConfirmModal";
import { useMergeState } from "../../../Helpers/customHooks";
import { findDOMNode } from "react-dom";

const AdminOrderTable = (props) => {
  const toggleRef = useRef(undefined);
  const debounceRef = useRef(undefined);
  const [state, setState] = useMergeState({
    visibleCloneOrder: false,
    isShow: props.isShow,
  });

  const { className, data, date, fetchHistory } = props; // index
  const { visibleCloneOrder, loading, isShow } = state;
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

  const generateColumns = () => {
    const columns = [
      {
        title: "No.",
        dataIndex: "index",
      },
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Price",
        dataIndex: "price",
        render: (cell) => getPrice(cell, undefined, ""),
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
      },
    ];
    return columns;
  };

  const toggleCloneOrder = () => {
    setState({ visibleCloneOrder: !visibleCloneOrder });
  };

  const onCloneOrder = async () => {
    setState({ loading: true });
    const res = await mutationCloneOrder(data);
    const obj = { loading: false };
    if (res.isSuccess) {
      alert("Successfully cloning order!");
      _.assign(obj, { visibleCloneOrder: false });
      fetchHistory();
    } else {
      alert("Failed to clone order: ", res.message);
    }
    setState(obj);
  };

  return (
    <div className={classnames("admin-order-table", className)}>
      <div className="fr-sb">
        <div className="flex">
          <span className="b mr-4">Date: </span>
          <span>{moment(date).format("HH:mm, DD/MM/YY")}</span>
        </div>
        <div className="flex">
          <span className="b mr-4">Total: </span>
          <span>{getOrderTotal(data)}</span>
        </div>

        <Button
          type="link"
          onClick={toggleShow}
          // className="food-table-show-btn"
        >
          {isShow ? "Hide" : "Show"}
        </Button>
        <Button type="link" onClick={toggleCloneOrder}>
          Clone order
        </Button>
      </div>

      <div ref={toggleRef}>
        <AntdTable
          className="mt-16"
          rowKey="index"
          totalData={data}
          columns={generateColumns()}
        ></AntdTable>
      </div>

      <ConfirmModal
        visible={visibleCloneOrder}
        toggleClick={toggleCloneOrder}
        onClick={onCloneOrder}
        type="CLONE_ORDER"
        loading={loading}
      />
    </div>
  );
};

AdminOrderTable.defaultProps = {
  className: "",
  data: [],
  date: undefined,
  fetchHistory: () => {},
  // index: 0,
};

AdminOrderTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  date: PropTypes.string,
  fetchHistory: PropTypes.func,
  // index: PropTypes.number,
};

export default AdminOrderTable;
