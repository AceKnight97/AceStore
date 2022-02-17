import { Button } from "antd";
import classnames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { getFoodMasterData } from "../../Components/Pages/Home/HomeBody/helper";
import AddFood from "../../Components/Pages/User/AddFood";
import Loading from "../../Components/UI/Loading";
import { useMergeState } from "../../Helpers/customHooks";
import { checkDisabledFoodList, handleMutationAddFood } from "./helper";
import "./_handle-change-food.scss";

const HandleChangeFood = (props) => {
  const [state, setState] = useMergeState({
    foodList: [undefined],
    loading: false,
  });
  const { foodList, loading } = state;
  const { className, type } = props;

  const isAdd = type === "ADD";
  const isEdit = type === "EDIT";
  const isDelete = type === "DELETE";

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
    const res = await handleMutationAddFood(foodList, type);
    const obj = { loading: false };
    if (res.isSuccess) {
      alert(
        isAdd
          ? "Successfully adding new food!"
          : isEdit
          ? "Successfully editting food!"
          : "Successfully deleting food!"
      );
      await getFoodMasterData();
      _.assign(obj, { foodList: [undefined] });
      setState({ foodList: [] });
    } else {
      alert(
        isAdd
          ? "Failed to add new food: "
          : isEdit
          ? "Failed to edit food: "
          : "Failed to delete food: ",
        res.message
      );
    }
    setTimeout(() => {
      setState(obj);
    }, 200);
  };

  const isDisabledBtn = checkDisabledFoodList(foodList, isDelete);

  return (
    <div className={classnames("handle-change-food", className)}>
      <div className="handle-change-food-add-food">
        {_.map(foodList, (x, i) => (
          <AddFood
            key={i}
            index={i}
            data={x}
            onChangeFood={onChangeFood}
            onDeleteFood={onDeleteFood}
            className="animation-fadein-1s"
            type={type}
          />
        ))}
      </div>
      <div className="handle-change-food-add-btns">
        <Button
          type="dashed"
          onClick={onClickNewFood}
          disabled={isDisabledBtn || loading}
        >
          {isAdd ? "New food" : "Other food"}
        </Button>
        <Button
          type="primary"
          disabled={isDisabledBtn}
          onClick={onClickAddFood}
          loading={loading}
        >
          {isAdd ? "Add food" : isEdit ? "Edit food" : "Delete food"}
        </Button>
      </div>
      {loading && <Loading></Loading>}
    </div>
  );
};
HandleChangeFood.defaultProps = {
  className: "",
  type: "ADD",
};
HandleChangeFood.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

export default HandleChangeFood;
