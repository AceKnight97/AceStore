import { Tabs } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import HomeHeader from "../../Components/Pages/Home/HomeHeader";
import HandleUserUI from "../../Components/UI/HandleUserUI";
import auth from "../../Helpers/auth";
import { useMergeState } from "../../Helpers/customHooks";
import CustomerOrders from "../CustomerOrders";
import HandleChangeFood from "../HandleChangeFood";
import "./_user.scss";

const { TabPane } = Tabs;

const TABS = {
  ADD_FOOD: "ADD_FOOD",
  EDIT_FOOD: "EDIT_FOOD",
  DELETE_FOOD: "DELETE_FOOD",
  FOOD_ORDER: "FOOD_ORDER",
  USER_PROFILE: "USER_PROFILE",
};
const { ADD_FOOD, EDIT_FOOD, DELETE_FOOD, FOOD_ORDER, USER_PROFILE } = TABS;

const User = (props) => {
  const history = useHistory();
  const [state, setState] = useMergeState({
    activeTab: USER_PROFILE,
  });
  const { className } = props;
  const { activeTab } = state;
  const isAdmin = auth.getRole() === "Admin";

  useEffect(() => {
    if (!auth.isSuccess()) {
      history.push("/acestore");
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
            <HandleUserUI className="user-body-profile"></HandleUserUI>
          </TabPane>
          {isAdmin && (
            <>
              <TabPane
                tab={<div className="user-body-title">Add food</div>}
                key={ADD_FOOD}
              >
                <HandleChangeFood></HandleChangeFood>
              </TabPane>
              <TabPane
                tab={<div className="user-body-title">Edit food</div>}
                key={EDIT_FOOD}
              >
                <HandleChangeFood type="EDIT"></HandleChangeFood>
              </TabPane>
              <TabPane
                tab={<div className="user-body-title">Delete food</div>}
                key={DELETE_FOOD}
              >
                <HandleChangeFood type="DELETE"></HandleChangeFood>
              </TabPane>
              <TabPane
                tab={<div className="user-body-title">Food orders</div>}
                key={FOOD_ORDER}
              >
                <CustomerOrders isAll></CustomerOrders>
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
