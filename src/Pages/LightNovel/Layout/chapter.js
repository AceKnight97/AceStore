import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import PerfectCultivator from '../PerfectCultivator';

const Chapter = (props) => {
  const {
    className, value, goBack, data,
  } = props;

  const { title, hyperLink } = data;

  return (
    <div className={classnames('chapter', className)}>
      <Button
        icon={<LeftOutlined />}
        className='chapter-go-back'
        onClick={goBack}
      />

      <div className='chapter-title'>
        {title}
      </div>

      <a
        href={hyperLink}
        className='chapter-link'
        target='blank'
      >
        Originary
      </a>

      <div className='chapter-content'>
        {PerfectCultivator[value]}
      </div>
    </div>
  );
};
Chapter.defaultProps = {
  className: '',
  value: 0,
  goBack: () => { },
  data: {},
};
Chapter.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  goBack: PropTypes.func,
  data: PropTypes.shape(),
};

export default Chapter;
