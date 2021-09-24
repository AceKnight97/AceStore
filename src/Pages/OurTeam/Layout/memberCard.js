import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Card, Button } from 'antd';

const MemberCard = (props) => {
  const {
    className, data, isExtra, onClickExtra,
  } = props;

  const {
    icon, name, dob,
    role, skills, exp, programming,
    email, phone, hobbies, others,
  } = data;

  const renderTitle = () => (
    <div className='member-card-title'>
      <img src={icon} className='member-card-icon' alt='Avatar img' />

      <div className='member-card-name-dob'>
        <span className='b'>{name}</span>
        <span>{dob}</span>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className='member-card-content'>
      <div className='member-card-content-col'>
        <div className=''>
          <span>{`Role: ${role}`}</span>
        </div>

        <div className='mt4'>
          <span>{`Skills: ${skills}`}</span>
        </div>
      </div>

      <div className='member-card-content-col'>
        <div className=''>
          <span>{`Work experience: ${exp}`}</span>
        </div>

        <div className='mt4'>
          <span>{`Programming language: ${programming}`}</span>
        </div>
      </div>

      <div className='member-card-content-col'>
        <div className=''>
          <span>{`Email: ${email}`}</span>
        </div>

        <div className='mt4'>
          <span>{`Phone number: ${phone}`}</span>
        </div>
      </div>

      <div className='member-card-content-col'>
        <div className=''>
          <span>{`Hobbies: ${hobbies}`}</span>
        </div>

        <div className='mt4'>
          <span>{`Others: ${others}`}</span>
        </div>
      </div>

    </div>
  );

  const extra = () => (
    <Button onClick={onClickExtra}>
      more
    </Button>
  );

  return (
    <div className={classnames('member-card', className)}>
      <Card
        hoverable
        extra={isExtra ? extra() : undefined}
        title={renderTitle()}
      >
        {renderContent()}
      </Card>
    </div>
  );
};
MemberCard.defaultProps = {
  data: {},
  className: '',
  name: '',
  isExtra: false,
  onClickExtra: () => {},
};
MemberCard.propTypes = {
  data: PropTypes.shape(),
  className: PropTypes.string,
  name: PropTypes.string,
  isExtra: PropTypes.bool,
  onClickExtra: PropTypes.func,
};

export default MemberCard;
