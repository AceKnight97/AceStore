import _ from 'lodash';
import React from 'react';
import {
  EDUCATION_DATA, EXPERIENCE_DATA, OTHER_SKILLS_DATA, SKILLS_DATA, TEAM_PRODUCTS,
} from '../../../Constants/cvInfo';
import BodyTopic from './bodyTopic';
import CVExp from './cvExp';
import TeamProduct from './teamProduct';

const CVDetails = () => {
  const showExperience = () => (
    <>
      <BodyTopic title='Experience' />

      {_.map(EXPERIENCE_DATA, (x, i) => (
        <CVExp key={i} data={x} />
      ))}

    </>
  );

  const showEducation = () => (
    <>
      <BodyTopic title='Education' className='mt24' />

      <CVExp data={EDUCATION_DATA[0]} />
    </>
  );

  const showSkillsIcon = (data = []) => (
    <div className='my-skills-wrapper'>
      {_.map(data, (x, i) => (
        <div key={i} className='my-skills-item'>
          <div className='my-skills-div'>
            <img
              src={x.icon}
              className='my-skills-icon'
              alt='logo'
            />
          </div>
          <div className='my-skills-title'>
            <span>{x.title}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const showMySkills = () => (
    <>
      <BodyTopic title='My Skills' className='mt24' />

      {showSkillsIcon(SKILLS_DATA)}

    </>
  );
  const showOtherSkills = () => (
    <>
      <BodyTopic title='Other Skills' className='mt24' />

      {showSkillsIcon(OTHER_SKILLS_DATA)}

    </>
  );

  const showTeamProduct = () => (
    <>
      <BodyTopic title='Team Products' className='mt24' />

      <CVExp
        data={{
          name: "The projects that I've been working:",
        }}
      />

      {_.map(TEAM_PRODUCTS, (x, i) => (
        <TeamProduct key={i} data={x} />
      ))}

    </>
  );

  return (
    <div className='my-cv-right'>
      {showExperience()}

      {showEducation()}

      {showMySkills()}

      {showOtherSkills()}

      {showTeamProduct()}
    </div>
  );
};

CVDetails.defaultProps = {
};
CVDetails.propTypes = {
};

export default CVDetails;
