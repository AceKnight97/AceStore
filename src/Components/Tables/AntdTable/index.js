import { Table } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import "./_antd-table.scss";

const AntdTable = (props) => {
  useEffect(() => {}, []);

  const { loading, columns, className, rowKey, name, totalData, onRowClick } =
    props;

  return (
    <Table
      rowKey={rowKey}
      className={classnames(className, "antd-table")}
      dataSource={totalData}
      onRow={(record, rowIndex) => ({
        onClick: (e) => {
          onRowClick(rowIndex, record);
        },
      })}
      pagination={false}
      //   pagination={
      //     props.isNoPagination
      //       ? false
      //       : {
      //           itemRender,
      //           onChange: onChangePage,
      //           current: props.page,
      //           showSizeChanger: false,
      //         }
      //   }
      //   locale={{ emptyText: props.emptyText }}
      columns={columns}
      loading={loading}
      //   onChange={props.shouldShowAllData ? undefined : handleTableChange}
      //   sticky={props.sticky}
    />
  );
};

AntdTable.defaultProps = {
  name: "",
  className: undefined,
  onRowClick: () => {},
  shouldHideNextButton: false,
  fetchData: () => {},
  loading: false,
  sorter: {},
  shouldShowAllData: false,
  handleChangePage: () => {},
  isNoPagination: false,
  page: 1,
  sticky: false,
};

AntdTable.propTypes = {
  rowKey: PropTypes.string.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  totalData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onRowClick: PropTypes.func,
  shouldHideNextButton: PropTypes.bool,
  fetchData: PropTypes.func,
  loading: PropTypes.bool,
  sorter: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string,
  }),
  shouldShowAllData: PropTypes.bool,
  page: PropTypes.number,
  handleChangePage: PropTypes.func,
  isNoPagination: PropTypes.bool,
  sticky: PropTypes.bool,
};

export default AntdTable;
