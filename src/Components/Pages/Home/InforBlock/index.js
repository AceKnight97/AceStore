import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";

import { useMergeState } from "../../../../Helpers/customHooks";
import InputCT from "../../../Inputs/InputCT";

const InforBlock = (props) => {
  const [state, setState] = useMergeState({});
  const {
    className,
    onChange,
    value1,
    value2,
    name1,
    name2,
    placeholder1,
    placeholder2,
    title1,
    title2,
    type,
  } = props;

  let type1;
  let type2;
  switch (type) {
    case "NAME_PHONE":
      type2 = "NUMBER";
      break;
    case "ADDRESS_NOTES":
      break;
    default:
      break;
  }

  return (
    <div className={classnames("infor-block", className)}>
      <InputCT
        title={title1}
        name={name1}
        value={value1}
        onChange={onChange}
        placeholder={placeholder1}
        className=""
        type={type1}
      />

      <InputCT
        title={title2}
        name={name2}
        value={value2}
        onChange={onChange}
        placeholder={placeholder2}
        className="mt-16"
        type={type2}
      />
    </div>
  );
};
InforBlock.defaultProps = {
  className: "",
  value1: "",
  value2: "",
  name1: "",
  name2: "",
  placeholder1: undefined,
  placeholder2: undefined,
  title1: "",
  title2: "",
  type: "",
};
InforBlock.propTypes = {
  className: PropTypes.string,
  value1: PropTypes.string,
  value2: PropTypes.string,
  name1: PropTypes.string,
  name2: PropTypes.string,
  placeholder1: PropTypes.string,
  placeholder2: PropTypes.string,
  title1: PropTypes.string,
  title2: PropTypes.string,
};

export default InforBlock;
