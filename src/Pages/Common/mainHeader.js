import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';
import { Menu, Button } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import { PAGE_MANAGER } from '../../Constants';
import { HOME_HEADER, BUSINESS_FIELDS } from '../../Constants/home';
import { useMergeState } from '../../Helpers/customHooks';

const { Item, SubMenu } = Menu; // , ItemGroup

const {
  HOME, CONTACT, OUR_TEAM, // MY_CV, HOME_PAGE,
} = PAGE_MANAGER;

const MainHeader = (props) => {
  const { current, onUpdateCurrent } = props;

  const onClickHome = () => {
    if (current !== HOME) {
      onUpdateCurrent(HOME);
    }
  };

  const handleClick = (e) => {
    if (e.key !== current) {
      onUpdateCurrent(e.key);
    }
  };

  return (
    <div className='home-header'>

      <Button type='text' className='home-header-left' onClick={onClickHome}>
        <span>Static Promotional Website</span>
      </Button>

      <div className='home-header-right'>
        <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>

          <Item key={HOME_HEADER[0]}>
            {HOME_HEADER[0]}
          </Item>

          <SubMenu key={HOME_HEADER[1]} title={HOME_HEADER[1]}>
            <Item key={BUSINESS_FIELDS[0]}>
              {BUSINESS_FIELDS[0]}
            </Item>
            <Item key={BUSINESS_FIELDS[1]}>
              {BUSINESS_FIELDS[1]}
            </Item>
            <Item key={BUSINESS_FIELDS[2]}>
              {BUSINESS_FIELDS[2]}
            </Item>
            <Item key={BUSINESS_FIELDS[3]}>
              {BUSINESS_FIELDS[3]}
            </Item>
          </SubMenu>

          <Item key={HOME_HEADER[2]}>
            {HOME_HEADER[2]}
          </Item>

          <Item key={HOME_HEADER[3]}>
            {HOME_HEADER[3]}
          </Item>

        </Menu>
      </div>

    </div>
  );
};

MainHeader.defaultProps = {
  current: HOME,
  onUpdateCurrent: () => {},
};
MainHeader.propTypes = {
  current: PropTypes.string,
  onUpdateCurrent: PropTypes.func,
};

export default MainHeader;
