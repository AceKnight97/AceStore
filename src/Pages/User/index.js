import { Tabs } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import HomeHeader from "../../Components/Pages/Home/HomeHeader";
import auth from "../../Helpers/auth";
import { useMergeState } from "../../Helpers/customHooks";
import AddNewFood from "../AddNewFood";
import "./_user.scss";

const TABS = {
  ADD_FOOD: "ADD_FOOD",
  EDIT_FOOD: "EDIT_FOOD",
};
const { ADD_FOOD, EDIT_FOOD } = TABS;

const User = (props) => {
  const history = useHistory();
  const [state, setState] = useMergeState({
    activeTab: ADD_FOOD,
  });
  const { className } = props;
  const { activeTab } = state;
  const isAdmin = auth.getRole() === "Admin";
  const { email, username, phone, address, notes, role } = auth.getDataLogin();

  useEffect(() => {
    if (auth.getToken()) {
      // console.log({ HNavelogin: props.login });
    } else {
      // console.log({ Nologin: props.login });
      history.push("/home");
    }
  }, [props.login]);

  const onChangeTab = (activeTab = "") => {
    setState({ activeTab });
  };

  return (
    <div className={classnames("user", className)}>
      <HomeHeader></HomeHeader>
      <div className="user-body">
        <div className="user-body-title mt-24">User profile</div>

        <div className="user-body-profile">
          <div className="fr-sb">
            <div className="flex">
              <span className="b mr-4">Email:</span>
              <span>{email}</span>
            </div>
            <div className="flex">
              <span className="b mr-4">Username:</span>
              <span>{username}</span>
            </div>
            <div className="flex">
              <span className="b mr-4">Phone:</span>
              <span>{phone}</span>
            </div>
          </div>
          <div className="fr-sb">
            <div className="flex">
              <span className="b mr-4">Address:</span>
              <span>{address}</span>
            </div>
            <div className="flex">
              <span className="b mr-4">Notes:</span>
              <span>{notes}</span>
            </div>
            <div className="flex">
              <span className="b mr-4">Role:</span>
              <span>{role || "Customer"}</span>
            </div>
          </div>
        </div>

        {isAdmin && (
          <Tabs
            activeKey={activeTab}
            tabPosition="top"
            onChange={onChangeTab}
            className="mt-12"
          >
            <Tabs.TabPane
              tab={<div className="user-body-title">Add food</div>}
              key={ADD_FOOD}
            >
              <AddNewFood isAdd></AddNewFood>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={<div className="user-body-title">Edit food</div>}
              key={EDIT_FOOD}
            >
              <AddNewFood></AddNewFood>
            </Tabs.TabPane>
          </Tabs>
        )}
      </div>
    </div>
  );
};
User.defaultProps = {
  className: "",
};
User.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(User);
