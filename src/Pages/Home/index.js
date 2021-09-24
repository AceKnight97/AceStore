import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGE_MANAGER } from '../../Constants';
import { HOME_HEADER } from '../../Constants/home';
import { useMergeState } from '../../Helpers/customHooks';
import macIc from '../../Images/Pages/Home/mac-min.jpg';
import MainFooter from '../Common/mainFooter';
import MainHeader from '../Common/mainHeader';
import Contact from '../Contact';
import OurTeam from '../OurTeam';

const {
  HOME, CONTACT, OUR_TEAM, // MY_CV, HOME_PAGE,
} = PAGE_MANAGER;

const Home = () => {
  const location = useLocation();
  const [state, setState] = useMergeState({
    current: HOME,
  });
  useEffect(() => {
    console.log({ location });
    const { current } = location?.state || {};
    if (current) {
      setState({ current });
    }
  }, []);

  const { current } = state;

  const onUpdateCurrent = (newCurrent) => {
    console.log({ newCurrent });
    switch (newCurrent) {
      case HOME_HEADER[0]:
        if (current !== OUR_TEAM) {
          setState({ current: OUR_TEAM });
        }
        break;
      case HOME_HEADER[1]:
        break;
      case HOME_HEADER[2]:
        if (current !== CONTACT) {
          setState({ current: CONTACT });
        }
        break;
      case HOME_HEADER[3]:
        break;
      default:
        if (current !== HOME) {
          setState({ current: HOME });
        }
        break;
    }
  };

  const mainView = () => {
    switch (current) {
      case HOME: {
        return (
          <div className='home-main'>
            <div className='home-introduct'>
              <img src={macIc} className='home-introduct-icon' alt='Mac icon' />

            </div>
          </div>
        );
      }
      case OUR_TEAM: {
        return <OurTeam />;
      }
      case CONTACT: {
        return <Contact />;
      }
      default:
        return null;
    }
  };

  return (
    <div className='home'>

      <MainHeader
        current={current}
        onUpdateCurrent={onUpdateCurrent}
      />

      {mainView()}

      <MainFooter
        onUpdateCurrent={onUpdateCurrent}
      />

    </div>
  );
};

Home.defaultProps = {
};
Home.propTypes = {
};

export default Home;
