import { Button, Table } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { getPrice } from "../../../Helpers";
import "./_history-table.scss";
import moment from "moment";
import AntdTable from "../AntdTable";
import { getOrderTotal } from "./helper";

const HistoryTable = (props) => {
  const toggleRef = useRef(undefined);
  useEffect(() => {}, []);

  const { className, data, date, index } = props;

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

  const onClickCloneOrder = () => {
    console.log({ index });
  };

  return (
    <div className={classnames("history-table", className)} ref={toggleRef}>
      <div className="fr-sb">
        <div className="flex">
          <span className="b mr-4">Date: </span>
          <span>{moment(date).format("HH:mm, DD/MM/YY")}</span>
          <span className="b ml-16 mr-4">Total: </span>
          <span>{getOrderTotal(data)}</span>
        </div>
        <Button type="link" onClick={onClickCloneOrder}>
          Clone order
        </Button>
      </div>

      <AntdTable
        className="mt-16"
        rowKey="index"
        totalData={data}
        columns={generateColumns()}
      ></AntdTable>
    </div>
  );
};

HistoryTable.defaultProps = {
  className: "",
  data: [],
  date: undefined,
  index: 0,
};

HistoryTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  date: PropTypes.string,
  index: PropTypes.number,
};

export default HistoryTable;
