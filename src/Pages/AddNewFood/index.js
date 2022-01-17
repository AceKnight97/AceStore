import { Button } from "antd";
import classnames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import fetchMenu from "../../Apollo/Functions/Fetch/fetchMenu";
import { getFoodMasterData } from "../../Components/Pages/Home/HomeBody/helper";
import AddFood from "../../Components/Pages/User/AddFood";
import auth from "../../Helpers/auth";
import { useMergeState } from "../../Helpers/customHooks";
import { checkDisabledFoodList, handleMutationAddFood } from "./helper";
import "./_add-new-food.scss";

const AddNewFood = (props) => {
  const [state, setState] = useMergeState({
    foodList: [undefined],
    loading: false,
  });
  const { foodList, loading } = state;
  const { className, isAdd } = props;

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
    const res = await handleMutationAddFood(foodList, isAdd);
    const obj = { loading: false };
    if (res.isSuccess) {
      alert(
        isAdd ? "Successfully adding new food!" : "Successfully editting food!"
      );
      await getFoodMasterData();
      _.assign(obj, { foodList: [undefined] });
      setState({ foodList: [] });
    } else {
      alert(
        isAdd ? "Failed to add new food: " : "Failed to edit food: ",
        res.message
      );
    }
    setTimeout(() => {
      setState(obj);
    }, 200);
  };

  const isDisabledBtn = checkDisabledFoodList(foodList);

  return (
    <div className={classnames("add-new-food", className)}>
      <div className="add-new-food-add-food">
        {_.map(foodList, (x, i) => (
          <AddFood
            key={i}
            index={i}
            data={x}
            onChangeFood={onChangeFood}
            onDeleteFood={onDeleteFood}
            className="animation-fadein-1s"
            isAdd={isAdd}
          />
        ))}
      </div>
      <div className="add-new-food-add-btns">
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
          {isAdd ? "Add food" : "Edit food"}
        </Button>
      </div>
    </div>
  );
};
AddNewFood.defaultProps = {
  className: "",
  onChangeFood: () => {},
  onDeleteFood: () => {},
  onClickAddFood: () => {},
  foodList: [],
  isAdd: false,
};
AddNewFood.propTypes = {
  className: PropTypes.string,
  onChangeFood: PropTypes.func,
  onDeleteFood: PropTypes.func,
  onClickAddFood: PropTypes.func,
  foodList: PropTypes.arrayOf(PropTypes.shape()),
  isAdd: PropTypes.bool,
};

export default AddNewFood;
