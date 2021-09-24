// import classnames from 'classnames';
import {
  EnvironmentOutlined, GlobalOutlined, MailOutlined, PhoneOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import React from 'react';
import { INDUSTRY_KNOWLEDGE_DATA, LANGUAGE_DATA, SOCICAL_DATA } from '../../../Constants/cvInfo';
import blenderIc from '../../../Images/Pages/CVs/blender.svg';
import bookIc from '../../../Images/Pages/CVs/book.svg';
import gamingIc from '../../../Images/Pages/CVs/game-pad.svg';
import avatarIc from '../../../Images/Pages/CVs/myAvatar.jpg';
import moviesIc from '../../../Images/Pages/CVs/play-button.svg';
import searchIc from '../../../Images/Pages/CVs/search.svg';
import soccerIc from '../../../Images/Pages/CVs/soccer.svg';
import writtingIc from '../../../Images/Pages/CVs/writing.svg';
import InfoRow from './infoRow';

const HOBBIES_ARR1 = [
  {
    title: 'Reading',
    icon: bookIc,
  },
  {
    title: 'Movies',
    icon: moviesIc,
  },
  {
    title: 'Soccer',
    icon: soccerIc,
  },
  {
    title: 'Science',
    icon: searchIc,
  },
];
const HOBBIES_ARR2 = [
  {
    title: 'Gaming',
    icon: gamingIc,
  },
  {
    title: '3D design',
    icon: blenderIc,
  },
  {
    title: 'Writting',
    icon: writtingIc,
  },
  {
    title: '',
    icon: null,
  },
];
const GENERAL_INFO = [
  {
    icon: <MailOutlined />,
    title: 'tttriet1997@gmail.com',
  },
  {
    icon: <PhoneOutlined />,
    title: '(+84) 819 541 897',
  },
  {
    icon: <GlobalOutlined />,
    title: 'Website',
    type: 'LINK',
    link: 'https://aceknight97.github.io/staticpromotionalwebsite',
  },
  {
    icon: <EnvironmentOutlined />,
    title: 'District 7, Hochiminh city',
  },
];

const CVInformation = () => {
  const showHeader = () => (
    <div className='my-cv-header'>
      <img src={avatarIc} className='my-cv-avatar' alt='Avatar img' />

      <div className='my-cv-names'>
        <div className='my-cv-lastname'>
          <span>Truong Thanh</span>
        </div>
        <div className='my-cv-firstname'>
          <span>Triet</span>
        </div>
        <div className='my-cv-role'>
          <span>Web-App developer</span>
        </div>
      </div>
    </div>
  );

  const showGeneralInfo = () => (
    _.map(GENERAL_INFO, (x, i) => (
      <InfoRow
        className={i === 0 ? 'mt24' : 'mt16'}
        key={i}
        icon={x.icon}
        title={x.title}
        type={x?.type}
        link={x?.link || ''}
      />
    ))
  );

  const showIndustryKnowledge = () => (
    <div className='my-cv-body'>
      <div className='my-cv-body-title'>
        <span>Industry Knowledge</span>
      </div>

      {_.map(INDUSTRY_KNOWLEDGE_DATA, (x, i) => (
        <div key={i} className='my-cv-body-content'>
          <span className='a-dot'>●</span>
          <span>{x}</span>
        </div>
      ))}
    </div>
  );

  const showLanguages = () => (
    <div className='my-cv-body'>
      <div className='my-cv-body-title'>
        <span>Languages</span>
      </div>

      {_.map(LANGUAGE_DATA, (x, i) => (
        <div key={i} className='my-cv-body-content'>
          <span>{x}</span>
        </div>
      ))}
    </div>
  );

  const showSocial = () => (
    <div className='my-cv-body'>
      <div className='my-cv-body-title'>
        <span>Social</span>
      </div>

      <div className='f-col w-max-content'>
        {_.map(SOCICAL_DATA, (x, i) => (
          <a href={x.value} key={i} target=' ' className='my-cv-body-social'>
            {x.title}
          </a>
        ))}
      </div>
    </div>
  );

  const hobbiesArr = (arr = []) => _.map(arr, (x, i) => (
    <div key={i} className='my-cv-hobbies'>
      {x.icon && (
      <img
        src={x.icon}
        alt='Hobbies icon'
        className='my-cv-hobbies-icon'
      />
      )}
      <div className='my-cv-hobbies-title'>
        <span>{x.title}</span>
      </div>
    </div>
  ));

  const showHobbies = () => (
    <div className='my-cv-body'>
      <div className='my-cv-body-title'>
        <span>Hobbies</span>
      </div>

      <div className='my-cv-body-hobbies-wrapper'>
        {hobbiesArr(HOBBIES_ARR1)}
      </div>

      <div className='my-cv-body-hobbies-wrapper'>
        {hobbiesArr(HOBBIES_ARR2)}
      </div>

    </div>
  );

  return (
    <div className='my-cv-left'>
      {showHeader()}
      {showGeneralInfo()}
      {showIndustryKnowledge()}
      {showLanguages()}
      {showSocial()}
      {showHobbies()}
    </div>
  );
};

CVInformation.defaultProps = {
};
CVInformation.propTypes = {
};

export default CVInformation;
