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
import CustomerOrders from "../CustomerOrders";
import "./_user.scss";

const { TabPane } = Tabs;

const TABS = {
  ADD_FOOD: "ADD_FOOD",
  EDIT_FOOD: "EDIT_FOOD",
  FOOD_ORDER: "FOOD_ORDER",
  USER_PROFILE: "USER_PROFILE",
};
const { ADD_FOOD, EDIT_FOOD, FOOD_ORDER, USER_PROFILE } = TABS;

const User = (props) => {
  const history = useHistory();
  const [state, setState] = useMergeState({
    activeTab: USER_PROFILE,
  });
  const { className } = props;
  const { activeTab } = state;
  const isAdmin = auth.getRole() === "Admin";
  const { email, username, phone, address, notes, role } = auth.getDataLogin();

  useEffect(() => {
    if (!auth.isSuccess()) {
      history.push("/retail-store");
      setState({});
      // console.log({ Nologin: props.login });
    }
  }, [props.login]);

  const onChangeTab = (activeTab = "") => {
    setState({ activeTab });
  };

  return (
    <div className={classnames("user", className)}>
      <HomeHeader></HomeHeader>
      <div className="user-body">
        <Tabs
          activeKey={activeTab}
          tabPosition="top"
          onChange={onChangeTab}
          className="mt-12"
        >
          <TabPane
            tab={<div className="user-body-title">User profile</div>}
            key={USER_PROFILE}
          >
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
                {/*
                    <div className="flex">
                      <span className="b mr-4">Notes:</span>
                      <span>{notes}</span>
                    </div>
                    */}
                <div className="flex">
                  <span className="b mr-4">Role:</span>
                  <span>{role || "Customer"}</span>
                </div>
              </div>
            </div>
          </TabPane>
          {isAdmin && (
            <>
              <TabPane
                tab={<div className="user-body-title">Add food</div>}
                key={ADD_FOOD}
              >
                <AddNewFood isAdd></AddNewFood>
              </TabPane>
              <TabPane
                tab={<div className="user-body-title">Edit food</div>}
                key={EDIT_FOOD}
              >
                <AddNewFood></AddNewFood>
              </TabPane>
              <TabPane
                tab={<div className="user-body-title">Food orders</div>}
                key={FOOD_ORDER}
              >
                <CustomerOrders></CustomerOrders>
              </TabPane>
            </>
          )}
        </Tabs>
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
