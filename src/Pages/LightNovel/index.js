import { Button } from 'antd';
import _ from 'lodash';
import React from 'react';
import { useMergeState } from '../../Helpers/customHooks';
import { PERFECT_CULTIVATOR } from './constant';
import Chapter from './Layout/chapter';

const LightNovel = () => {
  const [state, setState] = useMergeState({
    chapter: undefined,
  });

  const onChange = (key, value) => {
    setState({ [key]: value });
  };

  const goBack = () => {
    setState({ chapter: undefined });
  };

  const { chapter } = state;

  const renderList = () => (
    <>
      <div className='light-novel-title'>
        Perfect Cultivator
      </div>
      {
        _.map(PERFECT_CULTIVATOR, (x, index) => (
          <Button
            type='link'
            key={index}
            className='light-novel-chapter'
            onClick={() => onChange('chapter', index)}
          >
            {x.title}
          </Button>
        ))
      }
    </>
  );

  return (
    <div className='light-novel'>
      <div className='light-novel-header'>Wellcome</div>

      <div className='light-novel-body'>
        {
          _.isNil(chapter)
            ? renderList() : (
              <Chapter
                data={PERFECT_CULTIVATOR[chapter]}
                value={chapter}
                goBack={goBack}
              />
            )
        }
      </div>

    </div>
  );
};
LightNovel.defaultProps = {
};
LightNovel.propTypes = {
};
export default LightNovel;
