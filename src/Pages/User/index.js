import classnames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import HomeHeader from "../../Components/Pages/Home/HomeHeader";
import auth from "../../Helpers/auth";
import AddFood from "../../Components/Pages/User/AddFood";
import { useMergeState } from "../../Helpers/customHooks";
import "./_user.scss";
import { Button } from "antd";
import { checkDisabledFoodList, handleMutationAddFood } from "./helper";

const User = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [state, setState] = useMergeState({
    foodList: [undefined],
    loading: false,
  });
  const { className } = props;
  const { foodList, loading } = state;
  const isAdmin = auth.getRole() === "Admin";
  // console.log({ isAdmin, a: auth.getRole() });
  const { email, username, phone, address, notes, role } = auth.getDataLogin();

  useEffect(() => {
    if (auth.getToken()) {
      // console.log({ HNavelogin: props.login });
    } else {
      // console.log({ Nologin: props.login });
      history.push("/home");
    }
  }, [props.login]);

  const onChange = (key, value) => {
    setState({ [key]: value });
  };

  const onClickNewFood = () => {
    foodList.push(undefined);
    setState({ foodList });
  };

  const onChangeFood = (index = 0, data = {}) => {
    foodList[index] = data;
    setState({ foodList });
  };

  const onDeleteFood = (index = 0) => {
    foodList.splice(index, 1);
    console.log({ onDeleteFood: foodList, index });
    setState({ foodList });
  };

  const onClickAddFood = async () => {
    setState({ loading: true });
    const res = await handleMutationAddFood(foodList);
    const obj = { loading: false };
    if (res.isSuccess) {
      alert("Successfully adding new food!");
      _.assign(obj, { foodList: [undefined] });
      setState({ foodList: [] });
    } else {
      alert("Failed to add new food: ", res.message);
    }
    setTimeout(() => {
      setState(obj);
    }, 200);
  };

  const isDisabledBtn = checkDisabledFoodList(foodList);

  return (
    <div className={classnames("user", className)}>
      <HomeHeader></HomeHeader>
      <div className="user-body">
        <div className="user-body-title">User profile</div>

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

        <div className="user-body-title">Add food</div>

        {isAdmin && (
          <>
            <div className="user-body-add-food">
              {_.map(foodList, (x, i) => (
                <AddFood
                  key={i}
                  index={i}
                  data={x}
                  onChangeFood={onChangeFood}
                  onDeleteFood={onDeleteFood}
                  className="animation-fadein-1s"
                />
              ))}
            </div>
            <div className="user-body-add-btns">
              <Button
                type="dashed"
                onClick={onClickNewFood}
                disabled={isDisabledBtn || loading}
              >
                New food
              </Button>
              <Button
                type="primary"
                disabled={isDisabledBtn}
                onClick={onClickAddFood}
                loading={loading}
              >
                Add food
              </Button>
            </div>
          </>
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
