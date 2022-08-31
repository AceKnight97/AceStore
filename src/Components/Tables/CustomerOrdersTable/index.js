import classnames from "classnames";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { useMergeState } from "../../../Helpers/customHooks";
import { isEmpty } from "../../../Utils";
import FoodOrderDrawer from "../../Modals/FoodOrderDrawer";
import DisplayStatus from "../../UI/DisplayStatus";
import AntdTable from "../AntdTable";
import "./_customer-orders-table.scss";

const CustomerOrdersTable = (props) => {
  const [state, setState] = useMergeState({
    foodOrderData: {},
  });

  const onUpdateFoodOrder = (foodOrderData) => {
    setState({ foodOrderData });
  };

  const { className, data } = props; // index
  //date, fetchHistory, status, notes
  const { foodOrderData } = state;

  const generateColumns = () => {
    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        render: (cell) => moment(cell).format("HH:mm"),
      },
      {
        title: "Username",
        dataIndex: "username",
      },
      {
        title: "Total",
        dataIndex: "total",
      },
      {
        title: "Destination",
        dataIndex: "destination",
      },
      {
        title: "Phone number",
        dataIndex: "phone",
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (cell) => <DisplayStatus cell={cell}></DisplayStatus>,
      },
    ];
    return columns;
  };

  const onRowClick = (rowIndex, record) => {
    // console.log({ record });
    setState({ foodOrderData: record });
  };

  const onCloseFoodOrderDrawer = () => {
    setState({ foodOrderData: {} });
  };

  return (
    <div className={classnames("admin-order-table", className)}>
      {data.length === 0 ? (
        <div className="no-data">There is no data to display</div>
      ) : (
        <AntdTable
          className="mt-16"
          rowKey="index"
          totalData={data}
          columns={generateColumns()}
          onRowClick={onRowClick}
        ></AntdTable>
      )}

      <FoodOrderDrawer
        visible={!isEmpty(foodOrderData)}
        data={foodOrderData}
        onClose={onCloseFoodOrderDrawer}
        onUpdateFoodOrder={onUpdateFoodOrder}
        isEditable={props.isEditable}
      />
    </div>
  );
};

CustomerOrdersTable.defaultProps = {
  className: "",
  data: [],
  date: undefined,
  fetchHistory: () => {},
  isShow: false,
  status: "",
  notes: "",
  isEditable: true,
};

CustomerOrdersTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  date: PropTypes.string,
  fetchHistory: PropTypes.func,
  isShow: PropTypes.bool,
  status: PropTypes.string,
  notes: PropTypes.string,
  isEditable: PropTypes.bool,
};

export default CustomerOrdersTable;
