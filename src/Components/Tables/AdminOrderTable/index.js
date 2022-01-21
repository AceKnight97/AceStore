import { Button } from "antd";
import classnames from "classnames";
import $ from "jquery";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { findDOMNode } from "react-dom";
import { getOrderTotal, getPrice } from "../../../Helpers";
import { useMergeState } from "../../../Helpers/customHooks";
import UserInfoModal from "../../Modals/UserInfoModal";
import AntdTable from "../AntdTable";
import "./_admin-order-table.scss";

const AdminOrderTable = (props) => {
  const toggleRef = useRef(undefined);
  const debounceRef = useRef(undefined);
  const [state, setState] = useMergeState({
    visibleUserInfo: false,
    isShow: props.isShow,
  });

  const { className, data, date, fetchHistory, status, notes } = props; // index
  const { visibleUserInfo, loading, isShow } = state;

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

  const toggleUserInfo = () => {
    setState({ visibleUserInfo: !visibleUserInfo });
  };

  const { username } = data?.[0]?.user || {};

  return (
    <div className={classnames("admin-order-table", className)}>
      <div className="fr-sb">
        <div className="flex w25">
          <span className="b mr-4">Date: </span>
          <span>{moment(date).format("HH:mm, DD/MM/YY")}</span>
        </div>
        <div className="flex w25">
          <span className="b mr-4">Total: </span>
          <span>{getOrderTotal(data)}</span>
        </div>

        <Button type="link" onClick={toggleShow} className="w25">
          {isShow ? "Hide" : "Show"}
        </Button>
        <Button type="link" onClick={toggleUserInfo} className="w25">
          {username || ""}
        </Button>
      </div>

      <div ref={toggleRef}>
        <div className="fr mt-16">
          <div className="flex mr-64">
            <span className="b mr-4">Status: </span>
            <span>{status}</span>
          </div>
          <div className="flex">
            <span className="b mr-4">Notes: </span>
            <span>{notes}</span>
          </div>
        </div>
        <AntdTable
          className="mt-16"
          rowKey="index"
          totalData={data}
          columns={generateColumns()}
        ></AntdTable>
      </div>

      <UserInfoModal
        visible={visibleUserInfo}
        toggleClick={toggleUserInfo}
        loading={loading}
        data={data?.[0]?.user}
      />
    </div>
  );
};

AdminOrderTable.defaultProps = {
  className: "",
  data: [],
  date: undefined,
  fetchHistory: () => {},
  isShow: false,
  status: "",
  notes: "",
};

AdminOrderTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  date: PropTypes.string,
  fetchHistory: PropTypes.func,
  isShow: PropTypes.bool,
  status: PropTypes.string,
  notes: PropTypes.string,
};

export default AdminOrderTable;
