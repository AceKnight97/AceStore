import React from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { MEMBER_INFO } from '../../Constants/ourTeam';
import MainHeader from '../Common/mainHeader';
import MemberCard from './Layout/memberCard';
import MainFooter from '../Common/mainFooter';

const OurTeam = (props) => {
  const history = useHistory();

  const renderMainView = () => (
    <div className='our-team-container'>
      {
        _.map(MEMBER_INFO, (x, i) => (
          <MemberCard
            onClickExtra={() => {
              if (x?.url) {
                history.push(x.url);
              }
            }}
            className={i !== 0 ? 'mt24' : ''}
            data={x}
            key={i}
            isExtra={x?.isExtra}
          />
        ))
      }
    </div>
  );

  return (
    <div className='our-team-main'>
      {renderMainView()}

    </div>
  );
};
// OurTeam.defaultProps = {
// };
// OurTeam.propTypes = {
// };

export default OurTeam;
