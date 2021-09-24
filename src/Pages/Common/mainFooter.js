import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button } from 'antd';
import { SkypeFilled, FacebookFilled } from '@ant-design/icons';
import { HOME_HEADER } from '../../Constants/home';

const FACE_BOOK = 'https://www.facebook.com/profile.php?id=100015087697713';

const MainFooter = (props) => {
  const { className, onUpdateCurrent } = props;
  return (
    <div className={classnames('main-footer', className)}>

      <div className='skype'>
        <SkypeFilled className='footer-icon' />
        <Button
          onClick={() => {
            onUpdateCurrent(HOME_HEADER[2]);
          }}
          type='link'
          className='email'
        >
          tttriet1997@gmail.com
        </Button>
      </div>

      <div className='facebook'>
        <FacebookFilled className='footer-icon facebook-color' />
        <Button
          onClick={() => window.open(FACE_BOOK, '')}
          type='link'
          className='email'
        >
          Facebook
        </Button>
      </div>

    </div>
  );
};
MainFooter.defaultProps = {
  className: '',
  onUpdateCurrent: () => {},
};
MainFooter.propTypes = {
  className: PropTypes.string,
  onUpdateCurrent: PropTypes.func,
};

export default MainFooter;
