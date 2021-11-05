import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Tag } from 'antd';
import { useMergeState } from '../../../../Helpers/customHooks';
import InforBlock from '../InforBlock';
import HomeTotal from '../HomeTotal';
import { FOOD_NAMES, MOCKING_FOOD_TABLE } from '../../../../Constants/home';
import FoodTable from '../FoodTable';

const ace = FOOD_NAMES;

const HomeBody = (props) => {
  const [state, setState] = useMergeState({
    name: '',
    phone: '',
    address: '',
    notes: '',
    total: 0,

    cartTags: [],

  });
  const { className } = props;
  const onChange = (key, value) => {
    setState({ [key]: value });
  }

  const { name, phone, address, notes, total, cartTags } = state;

  const renderToper = () => (
    <div className="home-body-toper">
      <InforBlock
        name1='name'
        value1={name}
        title1='Name:'
        name2='phone'
        value2={phone}
        title2='Phone number:'
        onChange={onChange}
        className='home-body-toper-block-1'
      />
      <InforBlock
        name1='address'
        value1={address}
        title1='Address:'
        name2='notes'
        value2={notes}
        title2='Notes:'
        onChange={onChange}
        className='home-body-toper-block-2'
      />
      <HomeTotal
        className='home-body-toper-block-3'
      />
    </div>
  );

  return (
    <div className={classnames('home-body', className)}>
      {renderToper()}

      <div className="home-body-main">

        {
          cartTags.length !== 0 && <div className="home-body-main-cart-tag">
            <div className="home-body-main-cart-tag-title">
              <span>Your cart:</span>
            </div>

            {
              _.map(cartTags, (x, i) => (
                <Tag
                  className="home-body-main-cart-tag-item"
                  color="orange">
                  {x}
                </Tag>
              ))
            }
          </div>
        }

        <FoodTable
          title={MOCKING_FOOD_TABLE.title}
          data={MOCKING_FOOD_TABLE.data}
        />

      </div>

    </div>
  );
};
HomeBody.defaultProps = {
  className: '',
};
HomeBody.propTypes = {
  className: PropTypes.string,
};

export default HomeBody;