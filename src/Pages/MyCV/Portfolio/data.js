import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../Images/Pages/Home/logo.svg';
import cardiac from '../../../Images/Pages/CVs/cardiac.svg';
import { PAGE_MANAGER } from '../../../Constants';
import detailsImg from '../../../Images/Pages/CVs/SMA/details.jpg';
import doneImg from '../../../Images/Pages/CVs/SMA/done.jpg';
import insightImg from '../../../Images/Pages/CVs/SMA/insight.jpg';
import journalImg from '../../../Images/Pages/CVs/SMA/journal.jpg';
import messageImg from '../../../Images/Pages/CVs/SMA/message.jpg';
import signInImg from '../../../Images/Pages/CVs/SMA/sign-in.jpg';
import profileImg from '../../../Images/Pages/CVs/SMA/profile.jpg';

import bccaIc1 from '../../../Images/Pages/CVs/BCCA/bcca-1.jpg';
import bccaIc2 from '../../../Images/Pages/CVs/BCCA/bcca-2.jpg';
import bccaIc3 from '../../../Images/Pages/CVs/BCCA/bcca-3.jpg';
import bccaIc4 from '../../../Images/Pages/CVs/BCCA/bcca-4.jpg';
import bccaIc5 from '../../../Images/Pages/CVs/BCCA/bcca-5.jpg';
import bccaIc6 from '../../../Images/Pages/CVs/BCCA/bcca-6.jpg';
import bccaIc7 from '../../../Images/Pages/CVs/BCCA/bcca-7.jpg';
import bccaIc8 from '../../../Images/Pages/CVs/BCCA/bcca-8.jpg';
import bccaIc9 from '../../../Images/Pages/CVs/BCCA/bcca-9.jpg';

import nanoIc from '../../../Images/Pages/CVs/nano.png';

import nano1 from '../../../Images/Pages/CVs/NANO/nano-1.jpg';
import nano2 from '../../../Images/Pages/CVs/NANO/nano-2.jpg';
import nano3 from '../../../Images/Pages/CVs/NANO/nano-3.jpg';
import nano4 from '../../../Images/Pages/CVs/NANO/nano-4.jpg';
import nano5 from '../../../Images/Pages/CVs/NANO/nano-5.jpg';
import nano6 from '../../../Images/Pages/CVs/NANO/nano-6.jpg';
import nano7 from '../../../Images/Pages/CVs/NANO/nano-7.jpg';
import nano8 from '../../../Images/Pages/CVs/NANO/nano-8.jpg';
import nano9 from '../../../Images/Pages/CVs/NANO/nano-9.jpg';
import nano10 from '../../../Images/Pages/CVs/NANO/nano-10.jpg';
import nano11 from '../../../Images/Pages/CVs/NANO/nano-11.jpg';
import nano12 from '../../../Images/Pages/CVs/NANO/nano-12.jpg';
import nano13 from '../../../Images/Pages/CVs/NANO/nano-13.jpg';
import nano14 from '../../../Images/Pages/CVs/NANO/nano-14.jpg';
import nano15 from '../../../Images/Pages/CVs/NANO/nano-15.jpg';

const SMA_IMAGES = [
  signInImg, detailsImg, journalImg, insightImg, messageImg, profileImg, doneImg,
];

const BCCA_IMAGES = [
  bccaIc1, bccaIc2, bccaIc3, bccaIc4, bccaIc5, bccaIc6, bccaIc7, bccaIc8, bccaIc9,
];
const NANO_IMAGES = [
  nano1, nano2, nano3, nano4, nano5, nano6, nano7, nano8, nano9, nano10, nano11, nano12, nano13, nano14, nano15,
];

export const SAVE_MONEY_APP = {
  icon: logo,
  title: 'Save Money App',
  rows: [
    [
      {
        title: '- Download:',
        value: 'Drive.',
        type: 'LINK',
        link: 'https://drive.google.com/drive/folders/1ODEouZVKNCbM-tc2RX-oFQBxGKSHRKd8?usp=sharing',
      },
      {
        title: '- Type:',
        value: 'Application.',
      },
    ],
    [
      {
        title: '- Guide:',
        value: 'Drive.',
        type: 'LINK',
        link: 'https://docs.google.com/presentation/d/1WFH_LRwNHAPLakqr_WVxxYhWldTpZ5hZmWKubg4XqMU/edit?usp=sharing',
      },
      {
        type: 'CUSTOM',
        children: () => (
          <Link to={{
            pathname: '/home',
            state: { current: PAGE_MANAGER.CONTACT },
          }}
          >
            Tell me your idea.
          </Link>
        ),
      },
    ],
    [
      {
        title: '- Description:',
        value: "It's an saving money app which lets you log your spending and also income at any date you want. The app will help your manage your finance.",
      },
    ],
  ],
  images: SMA_IMAGES,
  // iconBgColor: '#5abb3a'
};

export const BIOACRE_CARDIAC = {
  icon: cardiac,
  title: 'Biocare Cardiac',
  rows: [
    [
      {
        title: '- Take a look:',
        value: 'link.',
        type: 'LINK',
        link: 'https://staging.cardiac.biotricity.com/',
      },
      {
        title: '- Type:',
        value: 'Website.',
      },
    ],
    [
      {
        title: '- Description:',
        value: `
        I developed and continue to maintain the Biocare Cardiac website. 
        The web portal is designed to help clinics manage patient profiles, book appointments, and enable virtual consultation as appropriate, record medical procedures and prescriptions for each patient and create detailed related reports. 
        It is the longest and most complex project I have been engaged with in my current position. 
        The website can be found at this link.
        `,
      },
    ],
  ],
  images: BCCA_IMAGES,

};

export const NANO_DASHBOARD = {
  icon: nanoIc,
  title: 'Nano Dashboard',
  iconClassName: '',
  rows: [
    [
      {
        title: '- Take a look:',
        value: 'link.',
        type: 'LINK',
        link: 'https://nano-dashboard.projects.itrvn.com/',
      },
      {
        title: '- Type:',
        value: 'Website.',
      },
    ],
    [
      {
        title: '- Description:',
        value: `
        The web portal helps admin to manage their Hot & Cold machines (Devices), users, machine's models, creating replacements for needs. 
        It also supports filter, searching, creating and edit features for each tabs.
        `,
      },
    ],
  ],
  images: NANO_IMAGES,

};

const temp = `This web portal is the longest project I've ever done and still doing it now. I also coded the first line of the project. 
        It helps clinics to management their patients including their profiles, appointments, health care programs and reports.
        Each patient may have multiple health care programs which contains the patient basic informartion such as: first name, last name, email, address,... 
        and history and current of their sickness information in order to clinic nurse and physician to take care of them. 
        Clinic nurse uses the web portal to record the patient test result an clinic physicician gives medication prescription base on records.
        The patient and clinic users can also have virtual or in-person appointment by booking appointment on the web portal. 
        In the virual appointment, they have video call supported as a feature of the web portal. In-person appointment, patients go to the nearest clinic that was registered.
        Biocare cardiac has three kinds of report: Notification, Monthly and End Of Use Report. Notification report is generated when notification setting is triggered.
        For example: patient has not taken medication for 2 days or gotten low blood presure for 3 days consectively.
`;
