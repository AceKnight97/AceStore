import React, { useEffect, useRef } from 'react';
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
    isShow: props.isShow,
  });
  const { className, data, title, onChangeCart } = props;
  const { isShow } = state;
  useEffect(() => {
    if (!isShow) {
      const el = findDOMNode(toggleRef.current);
      $(el).slideUp('slow');
    }
  }, []);
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

  // const  = (isBuy = false, itemData = {}) => {
  //   console.log({ isBuy, itemData });
  // }

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
                _.map(_.range(0, 4), (y) => !_.isEmpty(data?.[x * 4 + y]) &&
                  <FoodCard
                    key={y}
                    {...data?.[x * 4 + y]}
                    onChangeCart={(item) => onChangeCart(item, title)}
                  />)
              }
            </div>
          ))
        }
      </div>

      <div className="food-table-ender" />
      <Button type="link" onClick={toggleShow} className='food-table-show-btn'>
        {isShow ? 'Hide' : 'Show'}
      </Button>
    </div>
  );
};
FoodTable.defaultProps = {
  className: '',
  data: [],
  title: '',
  onChangeCart: () => { },
  isShow: false,
};
FoodTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  title: PropTypes.string,
  onChangeCart: PropTypes.func,
  isShow: PropTypes.bool,
};

export default FoodTable;