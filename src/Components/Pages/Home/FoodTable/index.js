import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import $ from 'jquery';
import { Button } from 'antd';
import FoodCard from '../FoodCard';
import { useMergeState } from '../../../../Helpers/customHooks';
import { findDOMNode } from 'react-dom';


const FoodTable = (props) => {
  const toggleRef = useRef(undefined);
  const debounceRef = useRef(undefined);
  const [state, setState] = useMergeState({
    isShow: true,
  });
  const { className, data, title } = props;
  const { isShow } = state;
  const toggleShow = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      const el = findDOMNode(toggleRef.current);
      if (el) {
        $(el).slideToggle('slow');
      }
      setState({ isShow: !isShow });
    }, 200);
  }

  return (
    <div className={classnames('food-table', className)}>
      <div className="food-table-title">
        <span>{title}</span>
      </div>
      <div ref={toggleRef}>
        {
          _.map(_.range(Math.ceil(data?.length / 4)), (x) => (
            <div className="food-table-row" key={x}>
              {
                !_.isEmpty(data?.[x * 4]) &&
                <FoodCard
                  {...data?.[x * 4]}
                />
              }
              {
                !_.isEmpty(data?.[x * 4 + 1]) &&
                <FoodCard
                  {...data?.[x * 4 + 1]}
                />
              }
              {
                !_.isEmpty(data?.[x * 4 + 2]) &&
                <FoodCard
                  {...data?.[x * 4 + 2]}
                />
              }
              {
                !_.isEmpty(data?.[x * 4 + 3]) &&
                <FoodCard
                  {...data?.[x * 4 + 3]}
                />
              }
            </div>
          ))
        }
      </div>
      <Button type="link" onClick={toggleShow} className='food-table-show-btn'>
        {isShow ? 'Hide' : 'Show'}
      </Button>
    </div>
  );
};
FoodTable.defaultProps = {
  className: '',
  data: [],
  title: ''
};
FoodTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  title: PropTypes.string,
};

export default FoodTable;